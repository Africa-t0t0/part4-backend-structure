const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((max, blog) => {
        const filter = blog.likes > max.likes ? blog : max;
        const result = {
            author: filter.author,
            likes: filter.likes,
            title: filter.title
        }
        return result;
    }, blogs[0])
}

const mostBlogs = (blogs) => {
    const author = _.countBy(blogs, 'author')
    return _.maxBy(author, 'author')
}

const mostLikes = (blogs) => {
    const author = _.countBy(blogs, 'author')
    return _.maxBy(author, 'author')
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}