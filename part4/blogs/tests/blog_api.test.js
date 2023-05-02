const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");

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
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

describe("viewing a specific blog", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("should have blog id property", async () => {
    const response = await api.get("/api/blogs");

    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});

describe("addition of a new blog", () => {
  test("should add new blog", async () => {
    const response = await api.post("/api/blogs").send({
      title: "Test",
      author: "Test",
      url: "https://example.com",
      likes: 1,
    });

    const blogs = await api.get("/api/blogs");

    expect(response.id).toBeDefined();
    expect(response.title).toBe("Test");
    expect(response.author).toBe("Test");
    expect(response.likes).toBe(1);
    expect(blogs.body).toHaveLength(initialBlogs.length + 1);
  });

  test("should likes count equal 0 by default", async () => {
    const response = await api.post("/api/blogs").send({
      title: "Test",
      author: "Test",
      url: "https://example.com",
    });

    expect(response.likes).toBe(0);
  });

  test("should return bad request", async () => {
    const response = await api.post({});

    expect(response.status).toBe(400);
  });
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    let blogs = await Blog.find({});
    const blogs_count = blogs.length;
    const blogToDelete = blogs.map((blog) => blog.toJSON())[0];

    await api.delete(`api/blogs/${blogToDelete.id}`).expect(204);

    blogs = await Blog.find({});

    expect(blogs.length).toBe(blogs_count - 1);
  });
});

describe("updating the information of a blog", async () => {
  let blogs = await Blog.find({});
  const blogToUpdate = blogs.map((blog) => blog.toJSON())[0];

  let updatedBlog = await api.update(`api/blogs/${blogToUpdate}`).send({
    likes: 20,
  });

  expect(updatedBlog.likes).toBe(20);
});

afterAll(async () => {
  await mongoose.connection.close();
});
