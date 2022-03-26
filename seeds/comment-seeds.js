const { Comment } = require('../models');

const commentdata = [
  {
    body: "SLFJSLJ",
    user_id: 1,
    post_id: 1
  },
  {
    body: "sdhfjk",
    user_id: 1,
    post_id: 2
  },
  {
    comment_text: "sdfdv",
    user_id: 1,
    post_id: 3
  }
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;
