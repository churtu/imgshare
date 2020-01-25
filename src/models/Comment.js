const {Schema, model} = require('mongoose');
const {ObjectId} = Schema;

const CommentSchema = new Schema({
    email: {type:String},
    name: {type: String},
    comment: {type: String},
    created_at: {type: Date, default: Date.now},
    image_id: {type: ObjectId},
    gravatar: {type: String}
});

CommentSchema.virtual('image').set(function(image){
    this._image = image;
}).get(function(){
    return this._image;
});

module.exports = model('Comment', CommentSchema);