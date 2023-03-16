const express = require('express');
const allRoutes = require('./controllers');
const session = require('express-session');

//sets up express
const app = express();
const PORT = process.env.PORT || 3000;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//requiring models for syncing 
const { User, Post, Comment } = require('./models');

const sess = {
    secret: 'Super secret secret',
    cookies: {
        maxAge: 1000*60*60*2
    },
    resave: false,
    saveUninitialized: true, 
    store: new SequelizeStore({
        db: sequelize
    })
};
app.use(session(sess));

app.use(allRoutes)
app.get('/', (req, res) => {
    res.send("Hi welcome to my tech blog")
})
sequelize.sync({ force: true }).then(function(){
app.listen(PORT, function(){
        console.log('Listening on PORT ' + PORT)}
    )
})