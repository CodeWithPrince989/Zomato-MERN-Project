const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {

    const {fullName, email, password}=req.body;  //by default jo server express se create kiya vo  req.body se data padh hi nahi skata hai problem hoti hai, solution hai middleware

    const isUserAlreadyExists = await userModel.findOne({
        email
    })
    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"User already exists"
        })
    }

    //vry imp to hash password: if leaked privacy is protected by hashed, to hash pass we have library bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword    //save in token by libraries jsonwebtoken, cookie-parser
    })

    const token = jwt.sign({
        id: user._id,
    },process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message: "User register successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
}

async function loginUser(req, res){

    const { email, password } = req.body;

    const user = await userModel.findOne({
        email
    })

    if(!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: user._id,
    },process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message: "User register successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
 }

 function logoutUser(req, res){
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out successfully"
    });
 }

async function registerFoodPartner(req, res){

    const { name, email, password } = req.body;

    const isFoodPartnerAlreadyExists = await foodPartnerModel.findOne({
        email
    })

    if(isFoodPartnerAlreadyExists){
        return res.status(400).json({
            message: "Food Partner already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPArtner = await foodPartnerModel.create({
        name,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: foodPArtner._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "Food Partner registered successfully",
        foodPartner: {
            _id: foodPArtner._id,
            email: foodPArtner.email,
            name: foodPArtner.name
        }
    })

}

async function loginFoodPartner(req, res){

    const { email, password } = req.body;
    const foodPartner = await foodPartnerModel.findOne({ email });

    if (!foodPartner) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const token = jwt.sign({
        id: foodPartner._id
    }, process.env.JWT_SECRET);

    res.cookie("token", token);

    res.status(200).json({
        message: "Food Partner logged in successfully",
        foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name
        }
    });
}

async function logoutFoodPartner(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "Food Partner logged out successfully"
    });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}
