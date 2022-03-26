const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage', {
        id: 1,
        title: 'Handlebars Docs',
        body: "body for post test",
        created_at: new Date(),
        comments: [{}, {}],
        user_id: 1
      });
});

module.exports = router;