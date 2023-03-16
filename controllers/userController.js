const express = require('express');
const router = express.Router();
const { User } = require('../models');

//get all users
router.get('/', (req,res)=>{
    User.findAll().then(userData=>{
        res.json(userData)
    }).catch(err=>(
        console.log(err=>{
            res.status(500).json({msg:"oops", err})
        })
    ))
});

//find single user
router.get('/:id', (req, res) =>{
    User.findByPk(req.params.id,{
        include:[post]
    }).then(userData=>{
        res.json(userData)
    }).catch(err=>(
        console.log(err=>{
            res.status(500).json({msg:"oops", err})
        })
    ))
});

//create a new user
router.post('/', (req,res)=>{
    User.create({
        username: req.body.username,
        password: req.body.password
    }).then(userData=>{
        res.json(userData)
    }).catch(err=>(
        console.log(err=>{
            res.status(500).json({msg:"oops", err})
        })
    ))
});

//delete user
router.delete('/:id', (req,res) =>{
    User.destroy({
        where:{
            id: req.params.id
        }
    }).then(userData=>{
        res.json(userData)
    }).catch(err=>(
        console.log(err=>{
            res.status(500).json({msg:"oops", err})
        })
    ))
});

module.exports = router;