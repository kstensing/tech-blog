const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('dashboard');
});

module.exports = router;