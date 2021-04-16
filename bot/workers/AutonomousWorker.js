const User = require('../../db/models/User')
const systems = require('../constants/systems')
const cron = require('node-cron')
const { getStandardKeyboard } = require('../utils/getKeyboards')
const { addLotteryTicketsToUser } = require('../../utils/toolsForDatabaseWork')
const { addCookiesToUser } = require('../../utils/toolsForDatabaseWork')

class AutonomousWorker {
  constructor ({ bot }) {
    this.bot = bot
  }

  start () {
    this.controlFreeCookies()
    this.controlFreeLotteryTicket()
    cron.schedule('* * * * *', () => {
      this.controlFreeCookies()
      this.controlFreeLotteryTicket()
    })
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

  async controlAbsence () {
    // const lastTimeInterval = Date.now() - 1111111
    // const { firstTiming, secondTiming, thirdTiming, fourthTiming } = systems.absenceTimings
    // if (lastTimeInterval > ) {
    //
    // }
    // absenceTimings: {
    //   firstTiming: 60000,
    //     secondTiming: 180000,
    //     thirdTiming: 300000,
    //     fourthTiming: 420000
    // }
  }

  // longAbsenceNotification

  async sendMessage (id, message, keyboard) {
    await this.bot.telegram.sendMessage(id, message, keyboard)
  }
}

module.exports = AutonomousWorker
