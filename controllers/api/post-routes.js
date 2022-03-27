const router = require('express').Router();
const sequelize = require('../../config/connection');
const {
    Comment,
    User,
    Post
} = require('../../models');
const withAuth = require('../../utils/auth');

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
        .then(postData => res.json(postData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
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
            res.json(postData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//removed withAuth
router.post('/', (req, res) => {
    Post.create({
            title: req.body.title,
            body: req.body.body,
            user_id: req.session.user_id
        })
        .then(postData => res.json(postData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//removed withAuth
router.put('/:id', (req, res) => {
    Post.update({
            title: req.body.title,
            body: req.body.body
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(postData => {
            if (!postData) {
                res.status(404).json({
                    message: 'There is no post found with that id!'
                });
                return;
            }
            res.json(postData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//removed withAuth
router.delete('/:id', (req, res) => {
    console.log('id', req.params.id);
    Post.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(postData => {
            if (!postData) {
                res.status(404).json({
                    message: 'No post with this id found!'
                });
                return;
            }
            res.json(postData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;