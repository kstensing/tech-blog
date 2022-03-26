const router = require('express').Router();
const {
    Comment
} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Comment.findAll()
        .then(commentData => res.json(commentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//removed withAuth - will need to add back
router.post('/', (req, res) => {
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

//removed withAuth - will need to add back
router.delete('/:id', (req, res) => {
    Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(commentData => {
            if (!commentData) {
                res.status(404).json({
                    message: 'No comment with this id found!'
                });
                return;
            }
            res.json(commentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;