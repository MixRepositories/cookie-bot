const AutonomousWorker = require('./workers/AutonomousWorker')
const messagesRouter = require('./controllers/messages/messagesRouter.js')
const updateDataUserInDB = require('./middlewares/userInitialization')
const actionsRouter = require('./controllers/actions/actionsRouter')
const start = require('./controllers/commands/start.js')
const Mailman = require('./workers/Mailman')
const { Telegraf } = require('telegraf')
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
    this.initAutonomousWork()
    this.startBotController()
  }

  initBot () {
    this.bot = new Telegraf(this.token)
  }

  initAutonomousWork () {
    const controller = new AutonomousWorker({ bot: this.bot })
    controller.start()

    const mailman = new Mailman({ bot: this.bot })
    mailman.start()
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
}

module.exports = Bot
