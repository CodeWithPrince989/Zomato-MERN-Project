const foodModel = require('../models/food.model');

async function createFood(req, res) {
    const { name, video, description } = req.body;

    res.send("food item created successfully");
    
    if (!name || !video) {
        return res.status(400).json({
            message: 'Name and video are required.'
        });
    }

    const food = await foodModel.create({
        name,
        video,
        description,
        foodPartner: req.foodPartner._id
    });

    return res.status(201).json({
        message: 'Food created successfully.',
        food
    });
}

async function getFood(req, res) {
    const foods = await foodModel.find().populate('foodPartner', 'name');
    return res.status(200).json({ foods });
}

module.exports = {
    createFood,
    getFood
};