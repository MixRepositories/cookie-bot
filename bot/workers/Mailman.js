const Mailing = require('../../db/models/Mailing')
const User = require('../../db/models/User')
const { getKeyboardForMailing } = require('../../utils/getKeyboards')
const cron = require('node-cron')

class Mailman {
  constructor ({ bot }) {
    this.bot = bot
    this.mailings = []
  }

  start () {
    this.controllerSendingMails()
    cron.schedule('* * * * *', () => {
      this.controllerSendingMails()
    })
  }

  async controllerSendingMails () {
    await this.updateDeliveryList()
    await this.sendMailings()
  }

  async updateDeliveryList () {
    const dateNow = Date.now()
    this.mailings = await Mailing.find(
      {
        status: { $eq: true },
        delivery_date: { $lte: dateNow }
      }
    )
  }

  async sendMailings () {
    await Promise.all(
      this.mailings.map(async mailing => {
        const addressee = await User.find(JSON.parse((mailing.addressee)))
        await Promise.all(
          addressee.map(async user => {
            const keyboardForMailing = getKeyboardForMailing(JSON.parse(mailing.buttons))
            await this.bot.telegram.sendMessage(user.id, mailing.text, keyboardForMailing)
          })
        )
        await Mailing.updateOne({ _id: mailing._id }, { status: false })
      })
    )
  }
}

module.exports = Mailman