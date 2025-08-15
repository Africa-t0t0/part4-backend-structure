const blogsRouter = require('express').Router();
const Blog = require('../models/models.js');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body);

    if (!blog.url || !blog.title || !blog.likes) {
        return response.status(400).json({ error: 'url or title or likes is missing' });
    }
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog);
});

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    response.json(blog);
});


blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    blog.likes = request.body.likes;
    await blog.save();
    response.json(blog);
});

module.exports = blogsRouter;
