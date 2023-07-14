const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId

const itemSchema = new mongoose.Schema({
    owner : {
       type: ObjectID,
       required: [ true, 'Owner Information is required'],
       ref: 'User'
    },
    name: {
       type: String,
       required: true,
       trim: [ true, 'Name is required']
    },
    description: {
      type: String,
      required: [ true, 'Description is required']
    },
    category: {
       type: String,
       required: [ true, 'Category is required']
    },
    price: {
       type: Number,
       required:[ true, 'Price is required']
    },
    image: {
      type: String,
      required: [true, 'Item image is required...'],
    },
    }, {
    timestamps: true
    })


    module.exports = mongoose.model('Item', itemSchema)