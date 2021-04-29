const { getCategoriesPredictionInlineKeyboard } = require('../../utils/getKeyboards')

const provideCategoriesForSelection = async (ctx) => {
  const keyboard = getCategoriesPredictionInlineKeyboard()
  await ctx.reply(
    'Выберите категорию предсказания:',
    keyboard
  )
}

module.exports = provideCategoriesForSelection
