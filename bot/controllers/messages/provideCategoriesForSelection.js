const { getCategoriesPredictionInlineKeyboard } = require('../../utils/getKeyboards')

const provideCategoriesForSelection = async (ctx) => {
  const keyboard = getCategoriesPredictionInlineKeyboard()
  await ctx.reply(
    '<a href="https://s0.rbk.ru/v6_top_pics/media/img/5/46/756038770746465.jpg">&#8203;</a>Выберите категорию предсказания:',
    {
      parse_mode: 'HTML',
      disable_web_page_preview: true,
      ...keyboard
    }
  )
}

module.exports = provideCategoriesForSelection
