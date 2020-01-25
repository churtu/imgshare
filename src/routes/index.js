const router = require('express').Router();
const indexController = require('../controllers/indexController');
const imageController = require('../controllers/imagesController');

module.exports = app => {
    router.get('/', indexController.index);
    router.get('/images/:image_id', imageController.index);
    router.post('/images', imageController.create);
    router.post('/images/:image_id/like', imageController.like);
    router.post('/images/:image_id/comment', imageController.comment);
    router.delete('/images/:image_id', imageController.delete);

    app.use(router);
}