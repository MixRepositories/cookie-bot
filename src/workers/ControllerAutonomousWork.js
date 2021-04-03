const User = require('../models/User')
const workers = require('../constants/workers')
const cron = require('node-cron')

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
    const dateForFilter = Date.now() - workers.freeCookieAccrualInterval
    const fondUsers = await User.find({ last_crush: { $lte: dateForFilter }, cookies: { $eq: 0 } })
    fondUsers.forEach(user => {
      this.addCookie(user.id)
      this.sendMessage(user.id, 'Вам добавлена печеника! Скорее разломи ее 😊')
    })
  }

  async addCookie (id) {
    try {
      await User.updateOne({ id }, { $inc: { cookies: 1 } })
    } catch (e) {
      console.log(e)
    }
  }

  async sendMessage (id, message) {
    await this.bot.telegram.sendMessage(id, message)
  }
}

module.exports = ControllerAutonomousWork
