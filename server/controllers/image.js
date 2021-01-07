const fs = require('fs')
const Image = require('../models/image')

exports.imageById = (req, res, next, id) => {
    Image.findById(id).exec((err, image) => {
        if (err || !image) {
            return res.status(400).json({
                error: 'Image not found'
            })
        }
        req.image = image
        next()
    })
}

exports.read = (req, res) => {
    req.image.photo = undefined
    return res.json(req.image)
}

exports.create = (req, res) => {
   req.body.images.map((imageData) => {
       const image = new Image()

       image.user = req.profile
       image.data_url = imageData.data_url

       image.save((err, result) => {
           if (err) {
               return res.status(400).json({
                   error: err
               })
           }

           res.json(result)
       })
   })
}

exports.remove = (req, res) => {
    let image = req.image

    image.remove((err, deleted) => {
        if (err) {
            return res.status(400).json({
                error: "Something went wrong."
            })
        }
        res.json({
            'message': 'Image deleted successfully' 
        })
    })
}

exports.list = (req, res) => {

    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Image.find()
        .populate()
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, images) => {
        if (err) {
            return res.status(400).json({
                error: 'Images not found'
            })
        }
        res.json(images)
    })
}

exports.photo = (req, res, next) => {
    if (req.image.photo.data) {
        res.set('Content-Type', req.image.photo.contentType)
        return res.send(req.image.photo.data)
    }
    next()
}
