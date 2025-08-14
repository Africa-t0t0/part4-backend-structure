const blogsRouter = require('express').Router();
const Blog = require('../models/models.js');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body);

    if (!blog.url || !blog.title) {
        return response.status(400).json({ error: 'url or title is missing' });
    }

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog);
});

module.exports = blogsRouter;
