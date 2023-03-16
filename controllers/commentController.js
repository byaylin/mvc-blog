const express = require('express');
const router = express.Router();
const { Comment, User, Post } = require('../models');

//get all comments
router.get('/',(req, res) =>{
    Comment.findAll().then(commentData=>{
        res.json(commentData)
    }).catch(err=>(
        console.log(err=>{
            res.status(500).json({msg:"oops", err})
        })
    ))
});

//get one comment
router.get('/:id',(req, res) =>{
    Comment.findByPk(req.params.id)
    .then(commentData=>{
        res.json(commentData)
    }).catch(err=>(
        console.log(err=>{
            res.status(500).json({msg:"oops", err})
        })
    ))
});
//create a comment
router.post('/', (req,res)=>{
    if(!req.session.userId){
        return res.status(403).json({msg:"you must login to comment"})
    }
    console.log(req.body);
    Comment.create({
        id: req.body.id,
        content: req.body.content,
        UserId: req.session.userId
    }).then(commentData=>{
        res.json(commentData)
    }).catch(err=>(
        console.log(err=>{
            res.status(500).json({msg:"oops", err})
        })
    ))
});

//update comment
router.put('/', (req,res)=>{
    Comment.update({
        id: req.body.id,
        content: req.body.content,
    }).then(commentData=>{
        res.json(commentData)
    }).catch(err=>(
        console.log(err=>{
            res.status(500).json({msg:"oops", err})
        })
    ))
});

//delete comment
router.delete('/:id',(req, res) =>{
    Comment.findByPk({
        where: {
            id: req.params.id
        }
    })
    .then(commentData=>{
        res.json(commentData)
    }).catch(err=>(
        console.log(err=>{
            res.status(500).json({msg:"oops", err})
        })
    ))
});