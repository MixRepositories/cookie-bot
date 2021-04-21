const cron = require('node-cron')
const User = require('../../db/models/User')
const systems = require('../constants/systems')
const Mailing = require('../../db/models/Mailing')
const { getStandardKeyboard } = require('../utils/getKeyboards')
const { getKeyboardForMailing } = require('../utils/getKeyboards')
const { addCookiesToUser } = require('../../utils/toolsForDatabaseWork')
const { addLotteryTicketsToUser } = require('../../utils/toolsForDatabaseWork')

class Mailman {
  constructor ({ bot }) {
    this.bot = bot
    this.mailings = []
  }

  start () {
    this.startControllers()
    cron.schedule('* * * * *', () => {
      this.startControllers()
    })
  }

  startControllers () {
    this.controlFreeCookies()
    this.controlFreeLotteryTicket()
    this.controllerSendingMails()
    this.controlNotification('firstNotification')
  }

  async controllerSendingMails () {
    await this.updateDeliveryList()
    await this.sendMailings()
  }

  async updateDeliveryList () {
    const dateNow = Date.now()
    this.mailings = await Mailing.find(
      {
        status: { $eq: true },
        delivery_date: { $lte: dateNow }
      }
    )
  }

  async sendMailings () {
    await Promise.all(
      this.mailings.map(async mailing => {
        await Mailing.updateOne({ _id: mailing._id }, { status: false })
        const addresseeFilter = mailing.addressee || {}
        const addressee = await User.find({
          ...addresseeFilter, status: true
        })
        await Promise.all(
          addressee.map(async user => {
            const keyboardForMailing = getKeyboardForMailing(mailing.buttons)
            try {
              await this.bot.telegram.sendMessage(user.id, mailing.text, keyboardForMailing)
            } catch (e) {
              await User.updateOne({ id: user.id }, { $set: { status: false } })
            }
          })
        )
      })
    )
  }

  async controlFreeCookies () {
    const dateForFilterCookie = Date.now() - systems.freeCookieAccrualInterval
    const usersNeedAddCookie = await User.find(
      {
        last_crush: { $lte: dateForFilterCookie },
        cookies: { $lte: 0 }
      })
    const standardKeyBoard = getStandardKeyboard()
    usersNeedAddCookie.forEach(user => {
      addCookiesToUser(user.id, 1)
      this.sendMessage(user.id, 'Тебе добавлена печенька! Скорее разломи ее 😊', standardKeyBoard)
    })
  }

  async controlFreeLotteryTicket () {
    const dateForFilterLotteryTicket = Date.now() - systems.freeLotteryTicketInterval
    const usersNeedAddLotteryTicket = await User.find(
      {
        last_erase: { $lte: dateForFilterLotteryTicket },
        lottery_ticket: { $lte: 0 }
      })
    const standardKeyBoard = getStandardKeyboard()
    usersNeedAddLotteryTicket.forEach(user => {
      addLotteryTicketsToUser(user.id, 1)
      this.sendMessage(user.id, 'Тебе доступен лотерейный билет! Скорее стирай защитный слой 😊', standardKeyBoard)
    })
  }

  async controlNotification (notification) {
    const filterDate = Date.now() - systems.notification[notification].timing
    const users = await User.find({ [notification]: false, endNotification: false, last_sign_in: { $lte: filterDate } })
    const standardKeyBoard = getStandardKeyboard()

    await Promise.all([
      users.map(async user => {
        await this.sendMessage(user.id, systems.notification[notification].message, standardKeyBoard)
        await User.updateOne({ id: user.id }, { $set: { [notification]: true } })
      })
    ])
  }

  async sendMessage (id, message, keyboard) {
    await this.bot.telegram.sendMessage(id, message, keyboard)
  }
}

module.exports = Mailman
