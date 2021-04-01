const TOKEN = '1718565237:AAFdUteJGx2cheprqYXAFbMn-W98nz11gEE'
const { Telegraf } = require('telegraf')
const start = require('./controllers/commands/start.js')
const messagesRouter = require('./controllers/messages/messagesRouter.js')
const subscriptionToAddCookies = require('./middlewares/subscriptionToAddCookies')
const updateDataUserInDB = require('./middlewares/userInitialization')

module.exports = () => {
  const bot = new Telegraf(TOKEN)

  bot.use(updateDataUserInDB)
  bot.use(subscriptionToAddCookies)

  // bot.hears()
  bot.start(start)
  bot.on('message', messagesRouter)

  bot.action('callback', async ctx => {
    return ctx.answerCbQuery(`Oh, ${ctx.match[0]}! Great choice`)

    // await ctx.reply('👍')
  })
  bot.help((ctx) => ctx.reply('Send me a sticker'))
  bot.on('message', (ctx) => ctx.reply('👍'))
  bot.command('/url', (ctx) => ctx.reply('👍'))
  bot.hears('callback', (ctx) => ctx.reply('👍'))
  bot.hears('hi', (ctx) => ctx.reply('Hey there'))
  bot.launch()
}
