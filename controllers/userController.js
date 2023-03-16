const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

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

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(userData =>{
        if(!userData){
            return res.status(401).json({msg: "wrong userrname or password"})
        } else {
            if(bcrypt.compareSync(req.body.password, userData.password)){
                req.session.userId = userData.id,
                req.session.userUsername = userData.username;
                return res.json(userData)
            } else {
                return res.status(401).json({msg: "wrong username or password"})
            }
        }
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