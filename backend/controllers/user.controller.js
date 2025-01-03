import User from "../models/user.models.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
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
        console.log(`register error: ${error.message}`);
        return next(errorHandler(500, "Internal server error"));
    }
}


export const login = async(req, res, next) => {
    const { email, password } = req.body;
    try {

        const existinguser = await User.findOne({ email });
        if (!existinguser) {
            return next(errorHandler(401, 'User does not exist '));
        }

        const validpassword = await bcrypt.compare(password, existinguser.password);
        if (!validpassword) {
            return next(errorHandler(401, 'Invalid password '));
        }

        let token;
        try {
            token = jwt.sign({ id: existinguser._id, },
                process.env.jwt_secret, {
                    expiresIn: '1h'
                }
            );

        } catch (error) {
            console.log(`Token generation error ${error.message}`);
            next(errorHandler(500, 'Token generation error . Please try again'));
        }


        res.cookie('access-token', token, { httpOnly: true, secure: true })
            .status(201)
            .json({
                success: true,
                message: 'User logged in successfully',
            })


    } catch (error) {
        console.log(`Login error${error.message}`);
        return next(errorHandler(500, 'Internal server error'));
    }
}