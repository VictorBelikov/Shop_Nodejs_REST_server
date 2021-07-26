exports.getPosts = (req, res) => {
  res.status(200).json({
    posts: [
      {
        _id: '1',
        title: 'First Post',
        content: 'This is the first post!',
        imageUrl: 'images/book.png',
        creator: { name: '=Some User=' },
        createdAt: new Date().toISOString(),
      },
    ],
  });
};

exports.createPost = (req, res) => {
  const { title } = req.body;
  const { content } = req.body;

  res.status(201).json({
    message: 'Post created successfully!',
    post: { id: new Date().toISOString(), title, content },
  });
};
