const express = require('express');
const router = express.Router();

const thoughtRoutes = require('./userController');
router.use('/api/user',thoughtRoutes);

const userRoutes = require('./userController');
router.use('/api/user',userRoutes);

const frontEndRoute = require('./frontendController');
router.use('/',frontEndRoute);

module.exports = router;