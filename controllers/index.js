const express = require('express');
const router = express.Router();

const userRoutes = require('./userController');
router.use('/api/user',userRoutes);

module.exports = router;