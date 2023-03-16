const express = require('express');
const router = express.Router();
const { User, Post} = require('../models');

//all posts
router.get('/', (req,res)=>{
    Post.findAll().then(postData=>{
        res.json(postData)
    }).catch(err=>(
        console.log(err=>{
            res.status(500).json({msg:"oops", err})
        })
    ))
});

//get single post
router.get('/:id', (req, res) =>{
    Post.findByPk(req.params.id, {
        include:[User]
    }).then(postData=>{
        res.json(postData)
    }).catch(err=>(
        console.log(err=>{
            res.status(500).json({msg:"oops", err})
        })
    ))
});

//create a post
router.post('/', (req,res)=>{
    if(!req.session.userId){
        return res.status(403).json({msg:"you must login to create a post"})
    }
    console.log(req.body);
    Post.create({
        title: req.body.title,
        post: req.body.post,
        UserId: req.session.userId
    }).then(postData=>{
        res.json(postData)
    }).catch(err=>(
        console.log(err=>{
            res.status(500).json({msg:"oops", err})
        })
    ))
});

//update a post 
router.put('/:id', (req,res) =>{
    Post.update({
        title: req.body.title,
        post: req.body.post,
        where: {
            id: req.params.userId
        }
    }).then(updatePost =>{
        if(!updatePost){
            res.status(404).json({msg:"oops"})
        }else{
            res.json(updatePost)
        }
    }).catch(err=>(
        console.log(err=>{
            res.status(500).json({msg:"oops", err})
        })
    ))
});

//delete a post
router.delete('/:id', (req, res) =>{
    if(!req.session.userId){
        return res.status(403).json({msg:"you must login"})
    }
    console.log(req.body);
    Post.findByPk(req.params.id).then(postData =>{
        if(!postData){
            return res.status(404).json({msg:"post does not exist"})
        } else if (!postData.userId===req.session.userId){
            return res.status(404).json({msg:"this post is not yours"})
        }
        Post.destroy({
            where:{
                if: req.params.id
            }
        }).then(postData=>{
            res.json(postData)
        }).catch(err=>(
            console.log(err=>{
                res.status(500).json({msg:"oops", err})
            })
        ))
    })
});

module.exports = router;