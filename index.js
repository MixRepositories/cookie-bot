
const db = require('./db')
const bot = require('./src/bot')

db
  .then(connect => {
    // console.log('connect', connect)
    bot()
  })
  .catch(error => {
    console.log('errorCatch', error)
  })

// const AnimationUrl1 = 'https://media.giphy.com/media/ya4eevXU490Iw/giphy.gif'
// const AnimationUrl2 = 'https://media.giphy.com/media/LrmU6jXIjwziE/giphy.gif'

// bot.commands('local', (ctx) => ctx.replyWithPhoto({ source: '/cats/cat1.jpeg' }))
// bot.commands('stream', (ctx) => ctx.replyWithPhoto({ source: fs.createReadStream('/cats/cat2.jpeg') }))
// bot.commands('buffer', (ctx) => ctx.replyWithPhoto({ source: fs.readFileSync('/cats/cat3.jpeg') }))
// bot.commands('pipe', (ctx) => ctx.replyWithPhoto({ url: 'https://picsum.photos/200/300/?random' }))
// bot.commands('url', (ctx) => ctx.replyWithPhoto('https://picsum.photos/200/300/?random'))
// bot.commands('animation', (ctx) => ctx.replyWithAnimation(AnimationUrl1))
// bot.commands('pipe_animation', (ctx) => ctx.replyWithAnimation({ url: AnimationUrl1 }))

// bot.commands('caption', (ctx) => ctx.replyWithPhoto(
//   'https://picsum.photos/200/300/?random',
//   { caption: 'Caption *text*', parse_mode: 'Markdown' }
// ))
//
// bot.commands('album', (ctx) => {
//   ctx.replyWithMediaGroup([
//     {
//       media: 'AgADBAADXME4GxQXZAc6zcjjVhXkE9FAuxkABAIQ3xv265UJKGYEAAEC',
//       caption: 'From file_id',
//       type: 'photo'
//     },
//     {
//       media: 'https://picsum.photos/200/500/',
//       caption: 'From URL',
//       type: 'photo'
//     },
//     {
//       media: { url: 'https://picsum.photos/200/300/?random' },
//       caption: 'Piped from URL',
//       type: 'photo'
//     },
//     {
//       media: { source: '/cats/cat1.jpeg' },
//       caption: 'From file',
//       type: 'photo'
//     },
//     {
//       media: { source: fs.createReadStream('/cats/cat2.jpeg') },
//       caption: 'From stream',
//       type: 'photo'
//     },
//     {
//       media: { source: fs.readFileSync('/cats/cat3.jpeg') },
//       caption: 'From buffer',
//       type: 'photo'
//     }
//   ])
// })
//
// bot.commands('edit_media', (ctx) => ctx.replyWithAnimation(
//   AnimationUrl1,
//   Markup.inlineKeyboard([
//     Markup.button.callback('Change media', 'swap_media')
//   ])
// ))
//
// bot.action('swap_media', (ctx) => ctx.editMessageMedia({
//   type: 'animation',
//   media: AnimationUrl2
// }))

// bot.launch()

// const { Telegraf, Markup } = require('telegraf')
//
// const token = '1718565237:AAFdUteJGx2cheprqYXAFbMn-W98nz11gEE'
// if (token === undefined) {
//   throw new Error('BOT_TOKEN must be provided!')
// }
//
// const bot = new Telegraf(token)
//
// bot.use(Telegraf.log())
//
// bot.commands('onetime', (ctx) =>
//   ctx.reply('One time keyboard', Markup
//     .keyboard(['/simple', '/inline', '/pyramid'])
//     .oneTime()
//     .resize()
//   )
// )
//
// bot.commands('custom', async (ctx) => {
//   return await ctx.reply('Custom buttons keyboard', Markup
//     .keyboard([
//       ['🔍 Search', '😎 Popular'], // Row1 with 2 buttons
//       ['☸ Setting', '📞 Feedback'], // Row2 with 2 buttons
//       ['📢 Ads', '⭐️ Rate us', '👥 Share'] // Row3 with 3 buttons
//     ])
//     .oneTime()
//     .resize()
//   )
// })
//
// bot.hears('🔍 Search', ctx => ctx.reply('Yay!'))
// bot.hears('📢 Ads', ctx => ctx.reply('Free hugs. Call now!'))
//
// bot.commands('special', (ctx) => {
//   return ctx.reply(
//     'Special buttons keyboard',
//     Markup.keyboard([
//       Markup.button.contactRequest('Send contact'),
//       Markup.button.locationRequest('Send location')
//     ]).resize()
//   )
// })
//
// bot.commands('pyramid', (ctx) => {
//   return ctx.reply(
//     'Keyboard wrap',
//     Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
//       wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
//     })
//   )
// })
//
// bot.commands('simple', (ctx) => {
//   return ctx.replyWithHTML(
//     '<b>Coke</b> or <i>Pepsi?</i>',
//     Markup.keyboard(['Coke', 'Pepsi'])
//   )
// })
//
// bot.commands('inline', (ctx) => {
//   return ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', {
//     parse_mode: 'HTML',
//     ...Markup.inlineKeyboard([
//       Markup.button.callback('Coke', 'Coke'),
//       Markup.button.callback('Pepsi', 'Pepsi')
//     ])
//   })
// })
//
// bot.commands('random', (ctx) => {
//   return ctx.reply(
//     'random example',
//     Markup.inlineKeyboard([
//       Markup.button.callback('Coke', 'Coke'),
//       Markup.button.callback('Dr Pepper', 'Dr Pepper', Math.random() > 0.5),
//       Markup.button.callback('Pepsi', 'Pepsi')
//     ])
//   )
// })
//
// bot.commands('caption', (ctx) => {
//   return ctx.replyWithPhoto({ url: 'https://picsum.photos/200/300/?random' },
//     {
//       caption: 'Caption',
//       parse_mode: 'Markdown',
//       ...Markup.inlineKeyboard([
//         Markup.button.callback('Plain', 'plain'),
//         Markup.button.callback('Italic', 'italic')
//       ])
//     }
//   )
// })
//
// bot.hears(/\/wrap (\d+)/, (ctx) => {
//   return ctx.reply(
//     'Keyboard wrap',
//     Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
//       columns: parseInt(ctx.match[1])
//     })
//   )
// })
//
// bot.action('Dr Pepper', (ctx, next) => {
//   return ctx.reply('👍').then(() => next())
// })
//
// bot.action('plain', async (ctx) => {
//   await ctx.answerCbQuery()
//   await ctx.editMessageCaption('Caption', Markup.inlineKeyboard([
//     Markup.button.callback('Plain', 'plain'),
//     Markup.button.callback('Italic', 'italic')
//   ]))
// })
//
// bot.action('italic', async (ctx) => {
//   await ctx.answerCbQuery()
//   await ctx.editMessageCaption('_Caption_', {
//     parse_mode: 'Markdown',
//     ...Markup.inlineKeyboard([
//       Markup.button.callback('Plain', 'plain'),
//       Markup.button.callback('* Italic *', 'italic')
//     ])
//   })
// })
//
// bot.action(/.+/, (ctx) => {
//   return ctx.answerCbQuery(`Oh, ${ctx.match[0]}! Great choice`)
// })
//
// bot.launch()
