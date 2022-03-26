const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Comment.findAll()
      .then(commentData => res.json(commentData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.post('/', withAuth, (req, res) => {
    // expects {body: "comment body", post_id: 1, user_id: 1, }
    Comment.create({
      body: req.body.body,
      post_id: req.body.post_id,
      user_id: req.session.user_id
    })
      .then(commentData => res.json(commentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  });
  

  module.exports = router;