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
        //console.log(posts)
        res.render("home",{
            //allPosts:hbsPosts
        })
    })
})

//login
router.get('/login', (req, res)=>{
    if(req.session.loggedIn){
        return res.redirect('/')
    }
    res.render('login', {
        loggedIn: req.session.loggedIn,
        userId: req.session.userId
    })
});

//sign up for account
router.get('/signup', (req,res)=>{
    res.render("signup")
});
//profile
router.get('/profile', (req, res)=>{
    if(!req.session.userId){
        return res.redirect('/login')
    }
    Post.findAll({
        where: {
            user_id: req.session.userId
        },
        include: [
            {
                model: User, 
                attributee: ["name"]
            }
        ]
    }).then((posts)=>{
        const hbsPosts = posts.map((post) => post.toJSON());
        res.render('profile', {
            userPosts: hbsPosts, 
            loggedIn: req.session.loggedIn,
            userId: req.session.userId
        });
    });
});

//logout 
router.get('/logout', (req, res) =>{
    req.session.destroy();
    res.send('logged out')
});



module.exports = router; 