const GoogleImages = require('google-images')

const client = new GoogleImages(process.env.CSE_ID, process.env.API_KEY)

exports.index = (req, res) => {
  resObject = { title: 'Home', images: [] }
  res.render('home', resObject)
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
  resObject = { title: 'Home' }
  resObject.images = []
  client.search(req.params.query, { num: 2, page: 1 })
    .then(images => {
      images.forEach(image => {
        resObject.images.push(image.url)
      })
      res.render('home', resObject)
      // res.json(images)
      /*
      [{
        "url": "http://steveangello.com/boss.jpg",
        "type": "image/jpeg",
        "width": 1024,
        "height": 768,
        "size": 102451,
        "thumbnail": {
          "url": "http://steveangello.com/thumbnail.jpg",
          "width": 512,
          "height": 512
        }
      }]
       */
    }).catch((err) => {
      console.log(err)
      res.end()
    })
}
