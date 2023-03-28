const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (!blogs.length) return null;

  let max = blogs[0];

  blogs.forEach((blog) => {
    if (blog.likes > max.likes) {
      max = blog;
    }
  });

  return max;
};

const mostBlogs = (blogs) => {
  if (!blogs.length) return null;

  let total = {};
  let max = blogs[0];

  blogs.forEach((blog) => {
    if (total[blog.author]) {
      total[blog.author] += 1;
    } else {
      total[blog.author] = 1;
    }

    if (total[blog.author] > total[max.author]) {
      max = blog;
    }
  });

  return {
    author: max.author,
    blogs: total[max.author],
  };
};

const mostLikes = (blogs) => {
  if (!blogs.length) return null;

  let total = {};
  let max = blogs[0];

  blogs.forEach((blog) => {
    if (total[blog.author]) {
      total[blog.author] += blog.likes;
    } else {
      total[blog.author] = blog.likes;
    }

    if (total[blog.author] > total[max.author]) {
      max = blog;
    }
  });

  return {
    author: max.author,
    likes: total[max.author],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
