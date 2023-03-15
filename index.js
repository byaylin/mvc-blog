const express = require('express');
//sets up express
const app = express();
const PORT = process.env.PORT || 3000;

const sequelize = require('./config/connection')
app.get('/', (req, res) => {
    res.send("Hi welcome to my tech blog")
})

sequelize.sync({ force: true }).then(function(){
app.listen(PORT, function(){
        console.log('Listening on PORT ' + PORT)}
    )
})