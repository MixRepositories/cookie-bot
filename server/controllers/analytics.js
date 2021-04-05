exports.all = (req, res) => {
  res.send({ method: 'GET', type: 'all', api: '/analytics' })
}
