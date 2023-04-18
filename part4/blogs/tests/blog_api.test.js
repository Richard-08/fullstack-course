const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://example.com",
        likes: 5,
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "https://example.com",
        likes: 10,
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "https://example.com",
        likes: 0,
    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "https://example.com",
        likes: 2,
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('should have blog id property', async () => {
    const response = await api.get('/api/blogs');

    response.body.forEach(blog => {
        expect(blog.id).toBeDefined()
    })
})

test("should add new blog", async () => {
    const response = await api.post('/api/blogs').send({
        title: "Test",
        author: "Test",
        url: "https://example.com",
        likes: 1,
    });

    const blogs = await api.get('/api/blogs');

    expect(response.id).toBeDefined();
    expect(response.title).toBe("Test");
    expect(response.author).toBe("Test");
    expect(response.likes).toBe(1);
    expect(blogs.body).toHaveLength(initialBlogs.length + 1)
})

test("should likes count equal 0 by default", async () => {
    const response = await api.post('/api/blogs').send({
        title: "Test",
        author: "Test",
        url: "https://example.com",
    });

    expect(response.likes).toBe(0);
})

test("should return bad request", async () => {
    const response = await api.post({});

    expect(response.status).toBe(400)
})

afterAll(async () => {
    await mongoose.connection.close()
})