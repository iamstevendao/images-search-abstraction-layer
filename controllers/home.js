exports.index = (req, res) => {
  res.render('home', {
    title: 'Home'
  })
}

exports.search = (req, res) => {
  // query the search string
  let query = req.body.query // requested url
  let resUrl = req.protocol + '://' + req.get('host') + req.originalUrl

  // redirect to the result page
  res.redirect(resUrl + query)
}

exports.result = (req, res) => {
  // redirect to the result page
  console.log(req.params.query)

  res.end()
}
