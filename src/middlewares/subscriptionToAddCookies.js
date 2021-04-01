const TimeControllerForAddCookie = require('../workers/TimeControllerForAddCookie')
const subscriptionToAddCookies = async (ctx, next) => {
  console.log('isNew', ctx.isNew)
  // eslint-disable-next-line no-new
  new TimeControllerForAddCookie({ ctx })
  next()
}

module.exports = subscriptionToAddCookies
