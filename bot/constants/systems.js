const ms = require('ms')

const systems = {
  freeCookieAccrualInterval: ms('1d'),
  freeLotteryTicketInterval: ms('7d'),
  absenceTimings: {
    firstTiming: 1000 * 60, //  ms('2d')
    secondTiming: 1000 * 60 * 3, // ms('5d')
    thirdTiming: 1000 * 60 * 5, // ms('14d')
    fourthTiming: 1000 * 60 * 7, // ms('30d')
    endTiming: 1000 * 60 * 8 // ms('31d')
  }
}

module.exports = systems
