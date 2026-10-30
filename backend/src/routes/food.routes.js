const express = require('express');
const foodController = require('../controllers/food.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/', foodController.getFood);
router.post('/', authMiddleware.authFoodPartnerMiddleware, foodController.createFood);


module.exports = router;