const express = require("express");
const router = express.Router();
const { User, Post } = require("../models");

router.get("/",(req,res)=>{
    Post.findAll({
        include:[User]
    }).then(postData=>{
        //console.log(postData)
        const posts = postData.map(post=>post.toJSON())
        console.log('==============================')
        console.log(posts)
        res.render("home",{
            //allPosts:hbsPosts
        })
    })
})

//login
router.get('/login', (req, res)=>{
   res.render("login")
});

//sign up for account
router.get('/signup', (req,res)=>{
    res.render("signup")
});
//profile
router.get("/profile",(req,res)=>{
    if(!req.session.userId){
        return res.redirect("/login")
    }
    User.findByPk(req.session.userId,{
        include:[Post]
    }).then(userdata=>{
        console.log(userdata)
        const hbsData = userdata.toJSON();
        console.log('==============================')
        console.log(hbsData)
        res.render("profile",hbsData)
    })
})

//logout 
router.get('/logout', (req, res) =>{
    req.session.destroy();
    res.send('logged out')
});



module.exports = router; 