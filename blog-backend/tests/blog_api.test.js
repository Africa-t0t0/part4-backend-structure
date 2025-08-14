const { test, after, beforeEach } = require('node:test');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const assert = require('node:assert');
const Blog = require('../models/models');

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
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
});

test.only('blogs are returned as json', async () => {
    await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
});


test.only('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 2)
});


after(async () => {
    await mongoose.connection.close();
});