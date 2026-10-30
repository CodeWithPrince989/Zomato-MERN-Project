const foodPartnerAuth = require('../models/foodpartner.model');
const jwt = require('jsonwebtoken');

async function authFoodPartner(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.' });
    }

    const foodPartner = await foodPartnerAuth.findById(decoded.id);
    if (!foodPartner) {
        return res.status(401).json({ message: 'Food partner account not found.' });
    }

    req.foodPartner = foodPartner;
    next();
}

module.exports = {
    authFoodPartnerMiddleware: authFoodPartner
};