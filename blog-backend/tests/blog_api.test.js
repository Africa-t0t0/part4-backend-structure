const { test, after, beforeEach } = require('node:test');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const assert = require('node:assert');
const Blog = require('../models/models');

const helper = require('./test_helpers');
const api = supertest(app);

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

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
});

test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
});


test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 2)
});


test('a valid blog can be added', async () => {
    const newBlog = {
        title: "Third blog",
        author: "Third author",
        url: "https://thirdblog.com",
        likes: 3
    }
    await api.post('/api/blogs').send(newBlog)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
});


test.only('blog without url is not added', async () => {
    const newBlog = {
        title: "Third blog",
        author: "Third author",
        likes: 3
    }
    await api.post('/api/blogs').send(newBlog).expect(400)
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})


after(async () => {
    await mongoose.connection.close();
});