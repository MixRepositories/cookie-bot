const hour = 3600000 // ms
const day = hour * 24 // ms
const week = day * 7 // ms

const systems = {
  freeCookieAccrualInterval: day, // ms
  freeLotteryTicketInterval: week, // ms
  loggedIntoGameForLongTime: day * 2
}

module.exports = systems
