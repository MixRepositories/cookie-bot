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
    this.bot.use(updateDataUserInDB)

    this.bot.start(start)
    this.bot.on('message', messagesRouter)
    this.bot.action(/.+/, actionsRouter)

    this.bot.launch()
  }

  async sendMailing (users, message, keyboard) {
    await Promise.all(users.map(async user => {
      await this.bot.telegram.sendMessage(user.id, message, keyboard)
    }))
  }
}

module.exports = Bot
