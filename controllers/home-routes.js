const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');


router.get('/', (req, res) => {
  console.log('------');
  Post.findAll({
          attributes: [
              'id',
              'title',
              'body',
              'created_at',
              'updated_at'
          ],
          include: [{
                  model: Comment,
                  attributes: ['id', 'body', 'created_at', 'updated_at', 'post_id', 'user_id'],
                  include: {
                      model: User,
                      attributes: ['username']
                  }
              },
              {
                  model: User,
                  attributes: ['username']
              }
          ]
      })
      .then(postData => {
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

module.exports = router;