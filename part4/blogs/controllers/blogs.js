const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400);
  }

  const payload = {
    ...request.body,
    likes: request.body.likes ? request.body.likes : 0,
  };

  const blog = new Blog(payload);
  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  if (!request.params.id) {
    return response.status(400);
  }

  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const blog = {
    likes: body.likes,
  };

  try {
    let updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
