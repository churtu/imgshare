const path = require('path');
const { randomName } = require('../helpers/libs');
const fs = require('fs-extra');
const { Image, Comment } = require('../models');
const md5 = require('md5');
const sidebar = require('../helpers/sidebar');

const ctrl = {}

ctrl.index = async (req, res) => {
    let viewModel = {image:{}, comments:{}};
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    if(image){
        image.views = image.views+1;
        await image.save();
        const comments = await Comment.find({image_id: image._id});
        viewModel.image = image;
        viewModel.comments = comments;
        viewModel = await sidebar(viewModel);
        res.render('image',viewModel);
    }else{
        res.redirect('/');
    }
}

ctrl.create = async (req, res) => {
    const saveImage = async () => {
        const random = randomName();
        const image = Image.find({ filename: random });
        if (image.length > 0) {
            saveImage();
        } else {
            const ext = path.extname(req.file.originalname).toLowerCase();
            const imgPath = req.file.path;

            const targetPath = path.resolve('src/public/upload/' + random + ext);
            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                await fs.rename(imgPath, targetPath);
                const newImage = new Image({
                    title: req.body.title,
                    description: req.body.description,
                    filename: random + ext
                });
                const i = await newImage.save();
                res.redirect(['/images/'+newImage.filename]);
            } else {
                await fs.unlink(imgPath);
                res.status(500).json({ error: 'Only images are allowed' });
            }
        }
    }
    saveImage();
}

ctrl.like = async (req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    if(image){
        image.likes = image.likes +1;
        await image.save();
        res.json({likes: image.likes});
    }else{
        res.redirect('/');
    }
}

ctrl.comment = async (req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    if(image){
        const newComment = new Comment(req.body);
        newComment.image_id = image._id;
        newComment.gravatar = md5(newComment.email);
        await newComment.save();
        res.redirect(['/images/'+req.params.image_id]);
    }else{
        res.redirect(['/']);
    }
    
}

ctrl.delete = async (req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    if(image){
        await fs.unlink(path.resolve('./src/public/upload/'+image.filename));
        await Comment.deleteOne({image_id: image._id});
        await image.remove();
        res.send('/');
    }
}


module.exports = ctrl;