const express = require('express');
const router = express.Router();

const postRoutes = require('./userController');
router.use('/api/posts',postRoutes);

const userRoutes = require('./userController');
router.use('/api/user',userRoutes);

const frontEndRoute = require('./frontendController');
router.use('/',frontEndRoute);

module.exports = router;