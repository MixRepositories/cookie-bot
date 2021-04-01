const User = require('../models/User')
const cron = require('node-cron')
const workers = require('../constants/workers')
const { getUserInfoFromCtx } = require('../utils/utils')

class TimeControllerForAddCookie {
  constructor (props) {
    if (TimeControllerForAddCookie.exists) {
      TimeControllerForAddCookie.ctx = props.ctx
      return TimeControllerForAddCookie.instance
    }

    TimeControllerForAddCookie.instance = this
    TimeControllerForAddCookie.exists = true

    this.ctx = props?.ctx
    this.userInfo = getUserInfoFromCtx(props?.ctx)
    this.timeCrawler()
  }

  async timeCrawler () {
    cron.schedule('* * * * *', async () => {
      if (await this.canEnrollFreeCookie()) {
        await this.addCookie()
        await this.sendMessage()
      }
    })
  }

  async canEnrollFreeCookie () {
    const { cookies: cookiesNow, last_crush: lastCrush } = await User.findOne({ id: this.userInfo.id })
    const readyToEnroll = +lastCrush + workers.freeCookieAccrualInterval
    return (cookiesNow < 1 && readyToEnroll <= Date.now())
  }

  async addCookie () {
    try {
      await User.updateOne({ id: this.userInfo.id }, { $inc: { cookies: 1 } })
    } catch (e) {
      console.log(e)
    }
  }

  async sendMessage () {
    await this.ctx.reply('added!')
  }
}

module.exports = TimeControllerForAddCookie
