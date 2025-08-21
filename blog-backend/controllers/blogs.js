const blogsRouter = require('express').Router();
const Blog = require('../models/models.js');
const User = require('../models/user.js');


const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
    const body = request.body;
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(body.userId);
    if (!user) {
        return response.status(400).json({ error: 'user not found' });
    }

    if (!body.url || !body.title || !body.likes) {
        return response.status(400).json({ error: 'url or title or likes is missing' });
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    });
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(blog._id);
    await user.save();

    response.status(201).json(savedBlog);
});

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    response.json(blog);
});


blogsRouter.delete('/:id', async (request, response) => {
    const token = getTokenFrom(request)
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
