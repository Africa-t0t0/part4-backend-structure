const blogsRouter = require('express').Router();
const Blog = require('../models/models.js');

blogsRouter.get('/', async (request, response) => {
    try {
        const blogs = await Blog.find({});
        response.json(blogs);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body);

    if (!blog.url || !blog.title) {
        return response.status(400).json({ error: 'url or title is missing' });
    }
    try {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

blogsRouter.get('/:id', async (request, response) => {
    try {
        const blog = await Blog.findById(request.params.id);
        response.json(blog);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});


blogsRouter.delete('/:id', async (request, response) => {
    try {
        const blog = await Blog.findByIdAndDelete(request.params.id);
        response.json(blog);
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

module.exports = blogsRouter;
