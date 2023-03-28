const listHelper = require("../list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const list = [
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        likes: 5,
      },
    ];

    expect(listHelper.totalLikes(list)).toBe(5);
  });

  test("of a bigger list is calculated rigth", () => {
    const list = [
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        likes: 5,
      },
      {
        title: "First class tests",
        author: "Robert C. Martin",
        likes: 10,
      },
      {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        likes: 0,
      },
      {
        title: "Type wars",
        author: "Robert C. Martin",
        likes: 2,
      },
    ];

    expect(listHelper.totalLikes(list)).toBe(17);
  });
});

describe("favorite blog", () => {
  test("of empty list is null", () => {
    expect(listHelper.favoriteBlog([])).toBeNull();
  });

  test("when list has only one blog", () => {
    const list = [
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        likes: 5,
      },
    ];

    expect(listHelper.favoriteBlog(list)).toEqual(list[0]);
  });

  test("of a bigger list", () => {
    const list = [
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        likes: 5,
      },
      {
        title: "First class tests",
        author: "Robert C. Martin",
        likes: 10,
      },
      {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        likes: 0,
      },
      {
        title: "Type wars",
        author: "Robert C. Martin",
        likes: 2,
      },
    ];

    expect(listHelper.favoriteBlog(list)).toEqual(list[1]);
  });
});

describe("most blogs", () => {
  test("of empty list is null", () => {
    expect(listHelper.mostBlogs([])).toBeNull();
  });

  test("when list has only one blog", () => {
    const list = [
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        likes: 5,
      },
    ];

    expect(listHelper.mostBlogs(list)).toEqual({
      author: list[0].author,
      blogs: 1,
    });
  });

  test("of a bigger list", () => {
    const list = [
      {
        title: "React patterns",
        author: "Michael Chan",
        likes: 7,
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        likes: 5,
      },
      {
        title: "First class tests",
        author: "Robert C. Martin",
        likes: 10,
      },
      {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        likes: 0,
      },
      {
        title: "Type wars",
        author: "Robert C. Martin",
        likes: 2,
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        likes: 5,
      },
    ];

    expect(listHelper.mostBlogs(list)).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("most likes", () => {
    test("of empty list is null", () => {
      expect(listHelper.mostLikes([])).toBeNull();
    });
  
    test("when list has only one blog", () => {
      const list = [
        {
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          likes: 5,
        },
      ];
  
      expect(listHelper.mostLikes(list)).toEqual({
        author: list[0].author,
        likes: 5,
      });
    });
  
    test("of a bigger list", () => {
      const list = [
        {
          title: "React patterns",
          author: "Michael Chan",
          likes: 7,
        },
        {
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          likes: 5,
        },
        {
          title: "First class tests",
          author: "Robert C. Martin",
          likes: 10,
        },
        {
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          likes: 0,
        },
        {
          title: "Type wars",
          author: "Robert C. Martin",
          likes: 2,
        },
        {
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          likes: 5,
        },
      ];
  
      expect(listHelper.mostLikes(list)).toEqual({
        author: "Robert C. Martin",
        likes: 12,
      });
    });
  });
