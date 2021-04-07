const User = require('../../db/models/User')
const systems = require('../constants/systems')
const cron = require('node-cron')
const getStandardKeyboard = require('../../utils/getKeyboards')
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
    const dateForFilter = Date.now() - systems.freeCookieAccrualInterval
    const fondUsers = await User.find({ last_crush: { $lte: dateForFilter }, cookies: { $eq: 0 } })
    fondUsers.forEach(user => {
      addCookiesToUser(user.id, 1)
      const standardKeyBoard = getStandardKeyboard()
      this.sendMessage(user.id, 'Вам добавлена печеника! Скорее разломи ее 😊', standardKeyBoard)
    })
  }

  async sendMessage (id, message, keyboard) {
    await this.bot.telegram.sendMessage(id, message, keyboard)
  }
}

module.exports = ControllerAutonomousWork
