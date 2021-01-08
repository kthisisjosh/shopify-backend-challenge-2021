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
       })
   })
   res.state(200).json({
       message: "Images successfully uploaded!"
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

exports.update = (req, res) => {
    const { isPrivate } = req.body
    let image = req.image

    Image.findOne({ _id: image._id }, (err, image) => {
        if (err) {
            return res.status(400).json({
                error: "Image not found."
            })
        }

        image.private = isPrivate

        image.save((err, updatedImage) => {
            if (err) {
                return res.status(400).json({
                    error: "Failed to update image."
                })
            }

            res.json(updatedImage)
        })
    })
}

exports.list = (req, res) => {

    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Image.find()
        .populate("user")
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

exports.listByUser = (req, res) => {
    let user = { user: req.profile._id }

    Image.find(user)
        .populate()
        .sort([])
        .limit()
        .exec((err, images) => {
        if (err) {
            return res.status(400).json({
                error: 'Images not found'
            })
        }
        res.json(images)
    })
}
