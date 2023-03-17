const express = require('express');
const allRoutes = require('./controllers');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path')

//sets up express
const app = express();
const PORT = process.env.PORT || 3000;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//requiring models for syncing 
const { User, Post, Comment } = require('./models');

const sess = {
    secret: process.env.SESSION_SECRET,
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
app.use(allRoutes);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const hbs = exphbs.create({});
app.engine("handlebars", hbs.engine);
app.set('view engine', 'handlebars');


app.get('/*', (req, res) => {
    res.send("oops")
})

app.get('/', (req,res) =>{
    res.json(req.session)
})

sequelize.sync({ force: true }).then(function(){
app.listen(PORT, function(){
        console.log('Listening on PORT ' + PORT)}
    )
});