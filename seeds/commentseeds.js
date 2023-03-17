const { Comment } = require('../models');

const commentTest = [
    {
    comment_text: "First!",
    user_id: 2,
    post_id: 1,    
    },
    {
    comment_text: "hello world !",
    user_id: 1,
    post_id: 3,    
    },
    {
    comment_text: "tesing to see if the comments work",
    user_id: 3,
    post_id: 2,   
    },
];

const seedComments = () => Comment.bulkCreate(commentTest);

module.exports = seedComments;