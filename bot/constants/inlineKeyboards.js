const inlineKeyboards = {
  callbacks: {
    dislike: {
      text: '👎', action: 'dislike'
    },
    like: {
      text: '👍', action: 'like'
    }

  },
  switches: {
    share: {
      text: 'Поделиться  📣',
      message: '- это бот который дает печеньки с предсказаниями! \n\n Потрясающе!'
    }
  }

}

module.exports = inlineKeyboards