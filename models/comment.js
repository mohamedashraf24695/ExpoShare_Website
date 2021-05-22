const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
 
  body: {
    type: String,
    required: true,
  },

  stroy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story' } ,
    
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Comment', CommentSchema)