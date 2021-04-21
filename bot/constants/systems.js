const ms = require('ms')

const systems = {
  freeCookieAccrualInterval: ms('1d'),
  freeLotteryTicketInterval: ms('7d'),
  notification: {
    firstNotification: {
      timing: ms('2d'),
      message: 'Привет! \n\n Пора разломить 🥠! \nТебя ждет твое предсказание!'
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

module.exports = systems
