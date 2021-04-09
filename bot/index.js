const { Telegraf } = require('telegraf')
const start = require('./controllers/commands/start.js')
const messagesRouter = require('./controllers/messages/messagesRouter.js')
const updateDataUserInDB = require('./middlewares/userInitialization')
const ControllerAutonomousWork = require('./workers/ControllerAutonomousWork')
const actionsRouter = require('./controllers/actions/actionsRouter')
const config = require('config')

class Bot {
  constructor () {
    if (Bot.exists) { return Bot.instance }

    this.token = config.get('tokenBot')

    this.init()

    Bot.instance = this
    Bot.exists = true
  }

  init () {
    this.initBot()
    this.initControllerAutonomousWork()
    this.startBotController()
  }

  initBot () {
    this.bot = new Telegraf(this.token)
  }

  initControllerAutonomousWork () {
    const controller = new ControllerAutonomousWork({ bot: this.bot })
    controller.start()
  }

  startBotController () {
    try {
      this.bot.use(updateDataUserInDB)

      this.bot.start(start)
      this.bot.on('message', messagesRouter)
      this.bot.action(/.+/, actionsRouter)

      this.bot.launch()
    } catch (e) {
      this.bot.telegram.sendMessage(720773953, e.message)
    }
  }

  async sendMailing (id, message, keyboard) {
    await this.bot.telegram.sendMessage(id, message, keyboard)
  }
}

module.exports = Bot
