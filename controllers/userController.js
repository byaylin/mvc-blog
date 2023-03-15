const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../models');

router.get('/', (req,res)=>{
    res.send('get to api/users')
})

module.exports = router;