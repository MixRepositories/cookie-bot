/**
 * Получить из контектса данные пользователя
 * @param {Object} ctx - контекст
 */
const getUserInfoFromCtx = ctx => ctx.update.message.from

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

// TODO: Реализовать функционал по определению падежа
function getCaseCookies (count) {
  return 'печенек'
}

module.exports = {
  getUserInfoFromCtx,
  getCaseCookies,
  randomInt
}
