const User = require('../../db/models/User')
const systems = require('../constants/systems')
const cron = require('node-cron')
const getStandardKeyboard = require('../../utils/getKeyboards')
const { addLotteryTicketsToUser } = require('../../utils/toolsForDatabaseWork')
const { addCookiesToUser } = require('../../utils/toolsForDatabaseWork')

class ControllerAutonomousWork {
  constructor ({ bot }) {
    this.bot = bot
  }

  start () {
    this.controllerAddingCookie()
    cron.schedule('* * * * *', async () => {
      this.controllerAddingCookie()
    })
  }

  async controllerAddingCookie () {
    const dateForFilterCookie = Date.now() - systems.freeCookieAccrualInterval
    const dateForFilterLotteryTicket = Date.now() - systems.freeLotteryTicketInterval

    const usersNeedAddCookie = await User.find(
      {
        last_crush: { $lte: dateForFilterCookie },
        cookies: { $lte: 0 }
      })
    const usersNeedAddLotteryTicket = await User.find(
      {
        last_erase: { $lte: dateForFilterLotteryTicket },
        lottery_ticket: { $lte: 0 }
      })

    const standardKeyBoard = getStandardKeyboard()

    usersNeedAddCookie.forEach(user => {
      addCookiesToUser(user.id, 1)
      this.sendMessage(user.id, 'Тебе добавлена печеника! Скорее разломи ее 😊', standardKeyBoard)
    })

    usersNeedAddLotteryTicket.forEach(user => {
      addLotteryTicketsToUser(user.id, 1)
      this.sendMessage(user.id, 'Тебе доступен лотерейный билет! Скорее стирай защитный слой 😊', standardKeyBoard)
    })
  }

  async sendMessage (id, message, keyboard) {
    await this.bot.telegram.sendMessage(id, message, keyboard)
  }
}

module.exports = ControllerAutonomousWork
