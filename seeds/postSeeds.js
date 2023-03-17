const { Post } = require('../models')

const postTest = [
    {
    title: "Test",
    content: "Hello World.",
    user_id: 1
    },
    {
    title: "Test2",
    content: "Testing for posts",
    user_id: 2
    },
    {
    title: "test 3",
    content: "Final test",
    user_id: 3
    },
]

const seedPosts = () => Post.bulkCreate(postTest);

module.exports = seedPosts;