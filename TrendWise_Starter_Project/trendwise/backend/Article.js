
const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  title: String,
  slug: String,
  meta: String,
  content: String,
  media: [String],
})

module.exports = mongoose.model('Article', articleSchema)
