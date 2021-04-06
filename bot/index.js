const { Telegraf } = require('telegraf')
const start = require('./controllers/commands/start.js')
const messagesRouter = require('./controllers/messages/messagesRouter.js')
const updateDataUserInDB = require('./middlewares/userInitialization')
const ControllerAutonomousWork = require('./workers/ControllerAutonomousWork')
const actionsRouter = require('./controllers/actions/actionsRouter')
const config = require('config')

module.exports = () => {
  const TOKEN = config.get('tokenBot')

  const bot = new Telegraf(TOKEN)

  const controller = new ControllerAutonomousWork({ bot })
  controller.start()

  bot.use(updateDataUserInDB)

  bot.start(start)
  bot.on('message', messagesRouter)
  bot.action(/.+/, actionsRouter)

  bot.launch()
}