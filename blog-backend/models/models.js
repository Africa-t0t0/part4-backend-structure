const mongoose = require('mongoose')
const { mongoUrl } = require('../utils/config')

mongoose.connect(mongoUrl)
  .then(result => {
    console.log("mongo connection success!");
  })
  .catch(error => {
    console.log("mongo connection error:", error.message);
  });

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog;