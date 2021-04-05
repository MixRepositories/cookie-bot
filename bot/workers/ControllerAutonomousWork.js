const User = require('../../db/models/User')
const systems = require('../constants/systems')
const cron = require('node-cron')
const getStandardKeyboard = require('../../utils/getKeyboards')

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
      this.addCookie(user.id)
      const standardKeyBoard = getStandardKeyboard()
      this.sendMessage(user.id, 'Вам добавлена печеника! Скорее разломи ее 😊', standardKeyBoard)
    })
  }

  async addCookie (id) {
    try {
      await User.updateOne({ id }, { $inc: { cookies: 1 } })
    } catch (e) {
      console.log(e)
    }
  }

  async sendMessage (id, message, keyboard) {
    await this.bot.telegram.sendMessage(id, message, keyboard)
  }
}

module.exports = ControllerAutonomousWork
