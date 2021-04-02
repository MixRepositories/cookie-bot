const User = require('../models/User')
const workers = require('../constants/workers')
const cron = require('node-cron')

class ControllerAutonomousWork {
  constructor ({ bot }) {
    this.bot = bot
  }

  start () {
    this.timeCrawler()
  }

  async timeCrawler () {
    cron.schedule('* * * * *', async () => {
      const dateForFilter = Date.now() - workers.freeCookieAccrualInterval
      const fondUsers = await User.find({ last_crush: { $lte: dateForFilter } })
      fondUsers.forEach(user => {
        if (user.cookies < 1) {
          this.addCookie(user.id)
          this.sendMessage(user.id, 'added!')
        } else {
          this.sendMessage(user.id, ' Вас давно не было, вы можете получить новое предсказание!')
        }
      })
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
