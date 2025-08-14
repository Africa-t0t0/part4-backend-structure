const Blog = require('../models/models');

const initialBlogs = [
    {
        title: "First blog",
        author: "First author",
        url: "https://firstblog.com",
        likes: 1
    },
    {
        title: "Second blog",
        author: "Second author",
        url: "https://secondblog.com",
        likes: 2
    }
];

const nonExistingId = async () => {
    const blog = new Blog({
        title: 'willremovethissoon',
        author: 'willremovethissoon',
        url: 'willremovethissoon',
        likes: 1
    })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb
}