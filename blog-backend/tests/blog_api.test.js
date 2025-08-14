const { test, after, beforeEach } = require('node:test');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const assert = require('node:assert');
const Blog = require('../models/models');

const helper = require('./test_helpers');
const api = supertest(app);


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


test('blog without url is not added', async () => {
    const newBlog = {
        title: "Third blog",
        author: "Third author",
        likes: 3
    }
    await api.post('/api/blogs').send(newBlog).expect(400)
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
});


test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToView = blogsAtStart[0];
    const resultNote = await api.get(`/api/blogs/${blogToView._id}`).expect(200).expect('Content-Type', /application\/json/)
    assert.strictEqual(resultNote.body.title, blogToView.title)
})


test.only('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    await api.delete(`/api/blogs/${blogToDelete._id}`).expect(204)
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

after(async () => {
    await mongoose.connection.close();
});