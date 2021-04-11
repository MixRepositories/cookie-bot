const { randomInt } = require('../../utils')

const getCookiesForLotteryTicket = () => {
  let count = randomInt(3, 20)
  if (count > 10) {
    count = randomInt(3, 20)
  }
  return count
}

module.exports = {
  getCookiesForLotteryTicket
}
