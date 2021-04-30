const inlineKeyboards = {
  callbacks: {
    dislike: { text: '👎', action: 'dislike' },
    like: { text: '👍', action: 'like' },
    erase: { text: '#### СТЕРЕТЬ ####', action: 'erase' },
    crush: { action: 'crush' }
  },
  switches: {
    share: {
      text: 'Рассказать  📣',
      message: '- с помошью этого бота можно получать печеньки с предсказниями! 🥠 \n\nПотрясающе!'
    }
  },
  categoriesPredictions (categories) {
    const keysCategories = Object.keys(categories)
    const keyboardData = []
    keysCategories.forEach(elem => {
      keyboardData.push({
        text: `${categories[elem].text} - ${categories[elem].price} 🥠`,
        action: `${this.callbacks.crush.action}?category=${elem}`
      })
    })
    return keyboardData
  }
}

module.exports = inlineKeyboards
