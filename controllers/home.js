const GoogleImages = require('google-images')

const client = new GoogleImages(process.env.CSE_ID, process.env.API_KEY)

exports.index = (req, res) => {
  // return a null array
  resObject = { title: 'Home', images: [] }
  res.render('home', resObject)
}

exports.search = (req, res) => {
  // query the search string
  let query = req.body.query
  // requested url
  let resUrl = req.protocol + '://' + req.get('host') + req.originalUrl

  // redirect to the result page
  res.redirect(resUrl + query)
}

exports.result = (req, res) => {
  // redirect to the result page
  let query = req.params.query
  resObject = { title: 'Home', request: query } // response object
  resObject.images = [] // array contains thumbnail and original image links
  client.search(query, { page: 1 })
    .then(images => {
      // handle the result
      images.forEach(image => {
        // push to the images array a object includes the thumbnail and original image
        resObject.images.push(
          {
            thumbnail: image.thumbnail.url,
            original: image.url
          })
      })
      res.render('home', resObject)

    }).catch((err) => {
      // if failed, log and end the response
      console.log(err)
      res.end()
    })
}
