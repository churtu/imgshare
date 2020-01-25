const { Image, Comment } = require('../models');

async function imageCounter() {
    return total = await Image.countDocuments();
}

async function commentCounter() {
    return total = await Comment.countDocuments();
}

async function imagesTotalViewsCounter() {
    result = await Image.aggregate([{
        $group: {
            _id: '1',
            viewsTotal: { $sum: '$views' }
        }
    }]);

    return result[0].viewsTotal;
}

async function likesTotalCounter() {
    result = await Image.aggregate([{
        $group: {
            _id: '1',
            totalLikes: { $sum: '$likes' }
        }
    }]);
    return result[0].totalLikes;
}

module.exports = async () => {
    const result = await Promise.all([
        imageCounter(),
        commentCounter(),
        imagesTotalViewsCounter(),
        likesTotalCounter()
    ]);

    return {
        images: result[0],
        comments: result[1],
        views: result[2],
        likes: result[3]
    }

}