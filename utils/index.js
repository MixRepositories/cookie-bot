const _fromPairs = require('lodash/fromPairs')
const _isUndefined = require('lodash/isUndefined')

/**
 * Получить из контектса данные пользователя
 * @param {Object} ctx - контекст
 */
const getUserInfoFromCtx = ctx => (
  ctx?.update?.message?.from ||
  ctx?.update?.callback_query?.from ||
  ctx?.update?.my_chat_member?.from
)

/**
 * Функция генерирует рандомное целое число [min, max]
 * @param {number} min - минимальное значение
 * @param {number} max - макцимальное значение
 * (max + 1 для того чтобы включить последнее значение в выборку)
 * @returns {number}
 */
function randomInt (min, max) {
  return min + Math.floor((max + 1 - min) * Math.random())
}

/**
 * Функция парсит запрос из колбека и выдает экшен и объект с параметрами
 * @param {string} queryCallback - строка запроса
 * @returns {{action: string, params: {}}}
 */
const parseQueryCallback = (queryCallback) => {
  const [action, mergedParams] = queryCallback?.split('?')
  const arrayParams = mergedParams?.split('&')?.map(elem => {
    return elem.split('=')
  })
  const params = _fromPairs(arrayParams)
  return { action, params }
}

/**
 * переводит общее количества секунд в формат ['00', '00', '00', '00']
 * @param {number} time - время в ms
 * @returns {[string, string, string, string]}
 */
const convertTime = time => {
  const nowTime = Math.round(new Date() / 1000)
  const endTime = Math.round(time / 1000)
  if (nowTime >= endTime) {
    return ['00', '00', '00', '00']
  } else {
    let timestamp = endTime - nowTime
    const days = Math.floor(timestamp / 60 / 60 / 24)
    timestamp -= days * 60 * 60 * 24
    const hours = Math.floor(timestamp / 60 / 60)
    timestamp -= hours * 60 * 60
    const minutes = Math.floor(timestamp / 60)
    timestamp -= minutes * 60
    const seconds = Math.abs(timestamp) % 60
    return [
      days.toString().padStart(2, '0'),
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ]
  }
}

const joinDateForMessage = array => {
  const time = array.slice(1)
  return `${array[0]} дней ${time.join(':')}`
}

function declOfNum (number, titles, returnString) {
  if (!_isUndefined(number) && !_isUndefined(titles)) {
    const cases = [2, 0, 1, 1, 1, 2]
    const title = titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ]
    if (returnString) {
      return `${number} ${title}`
    } else return title
  }
}

const declOfNumCookies = (number) => {
  const titles = ['печенька', 'печеньки', 'печенек']
  const returnString = true
  return declOfNum(number, titles, returnString)
}

module.exports = {
  parseQueryCallback,
  getUserInfoFromCtx,
  joinDateForMessage,
  declOfNumCookies,
  convertTime,
  declOfNum,
  randomInt
}
