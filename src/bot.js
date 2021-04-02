const TOKEN = '1718565237:AAFdUteJGx2cheprqYXAFbMn-W98nz11gEE'
const { Telegraf } = require('telegraf')
const start = require('./controllers/commands/start.js')
const messagesRouter = require('./controllers/messages/messagesRouter.js')
const updateDataUserInDB = require('./middlewares/userInitialization')
const ControllerAutonomousWork = require('./workers/ControllerAutonomousWork')
const actionsRouter = require('./controllers/actions/actionsRouter')

module.exports = () => {
  const bot = new Telegraf(TOKEN)

  const controller = new ControllerAutonomousWork({ bot })
  controller.start()

  bot.use(updateDataUserInDB)

  // bot.hears()
  bot.start(start)
  bot.on('message', messagesRouter)

  bot.action(/.+/, actionsRouter
    // async ctx => {
    // console.log(ctx)

  //   return ctx.answerCbQuery(`Oh, ${ctx.match[0]}! Great choice`)
  //
  //   // await ctx.reply('👍')
  // }
  )
  bot.help((ctx) => ctx.reply('Send me a sticker'))
  bot.command('/url', (ctx) => ctx.reply('👍'))
  bot.hears('callback', (ctx) => ctx.reply('👍'))
  bot.hears('hi', (ctx) => ctx.reply('Hey there'))
  bot.launch()
}
