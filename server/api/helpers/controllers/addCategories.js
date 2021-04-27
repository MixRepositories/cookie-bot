const CategoryPrediction = require('../../../../db/models/CategoryPrediction')

const addCategories = async (req, res) => {
  await CategoryPrediction.create([
    { code: 'future' },
    { code: 'love' },
    { code: 'main' },
    { code: 'money' },
    { code: 'whatToDo' },
    { code: 'work' }
  ])

  res.send({ method: 'GET', status: 'ok', api: req.url })
}
module.exports = addCategories
