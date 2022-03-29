const router = require('express').Router();
const sequelize = require('../config/connection');
const {
    Post,
    User,
    Comment
} = require('../models');
const withAuth = require('../utils/auth');


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
            const posts = postData.map(post => post.get({
                plain: true
            }));
            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/post/:id', withAuth, (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
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
            if (!postData) {
                res.status(404).json({
                    message: 'There is no post found with that id!'
                });
                return;
            }
            const post = postData.get({
                plain: true
            });
            res.render('single-post', {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;