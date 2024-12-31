import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

export const userVerification = async(req, res, next) => {
    try {
        const token = req.cookies.token; // Extract token from cookies

        if (!token) {
            // console.error("No token found in cookies");
            return next(errorHandler(401, 'Authentication token is required'));
        }

        const decoded = jwt.verify(token, process.env.jwt_secret); // Verify token
        //console.log("Decoded Token:", decoded); // Debug log

        if (!decoded || !decoded.id) {
            // console.error("Decoded token is missing 'id'");
            return next(errorHandler(401, 'Invalid token payload'));
        }

        req.user = { id: decoded.id }; // Attach user info to request
        //console.log("req.user after setting:", req.user); // Debug log
        next(); // Pass control to the next middleware
    } catch (error) {
        console.error(`Verification Error: ${error.message}`); // Log the error
        return next(errorHandler(500, 'Internal server error'));
    }
};