const ms = require('ms')

const notifications = {
  atAbsence: {
    firstNotification: {
      timing: ms('2d'),
      message: 'Привет! \n\nПора разломить печеньку 🥠! \nТебя ждет предсказание! \n\nВдруг оно изменит твою жизнь?'
    },
    secondNotification: {
      timing: ms('5d'),
      message: 'Привет! Ты давно не заходил 😔 \n\nДавай разломим 🥠 ?'
    },
    thirdNotification: {
      timing: ms('14d'),
      message: 'Привет! Ты давно не заходил 😔 \n\nДавай разломим 🥠 ?'
    },
    fourthNotification: {
      timing: ms('30d'),
      message: 'Привет! Ты давно не заходил 😔 \n\nДавай разломим 🥠 ?'
    },
    endNotification: {
      timing: ms('31d'),
      message: 'Привет! Ты давно не заходил 😔 \n\nДавай разломим 🥠 ?'
    }
  }
}

module.exports = notifications
