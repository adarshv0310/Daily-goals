import User from "../models/user.models.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from 'bcrypt';

export const register = async(req, res, next) => {
    const { email, password, name } = req.body;
    try {


        // to check user already exist or not
        const existinguser = await User.findOne({ email });
        if (existinguser) {
            return next(errorHandler(404, 'User alreay exist with thi email'));
        }

        // to save new user
        const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedpassword,

        });

        await newUser.save();


        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            User: {

                email: newUser.email,
                name: newUser.name,
                // Excluding the password from the response
            },
        })

    } catch (error) {
        console.log(`register error: ${error}`);
        return next(errorHandler(500, "Internal server error"));
    }
}