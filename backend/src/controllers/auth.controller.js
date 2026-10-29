const userModel = require("../models/user.model")

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

    const token = JsonWebTokenError.sign({
        id: user._id,
    }, "4974074aeb7c1ff4baac55fbe8e385f4")

    res.cookie("token", token)

    res.status(201).json({
        message: "User register successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
}

async function loginUser(req, res){ }
module.exports = {
    registerUser,
    loginUser
}