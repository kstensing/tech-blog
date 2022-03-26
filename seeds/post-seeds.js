const { Post } = require('../models');

const postdata = [
  {
    title: "title 1",
    body: "body of post 1",
    user_id: 1,
    post_id: 1
  },
  {
    title: "title 2",
    body: "body of post 2",
    user_id: 1,
    post_id: 1
  },
  {
    title: "title 3",
    body: "body of post 3",
    user_id: 1,
    post_id: 1
  }
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;