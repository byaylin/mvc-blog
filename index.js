const express = require('express');
//sets up express
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("Hi welcome to my tech blog")
})
    app.listen(PORT, function(){
        console.log('Listening on PORT ' + PORT)
    })