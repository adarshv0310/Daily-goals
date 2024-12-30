import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error';



export const userVerification = async(req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return next(errorHandler(401, 'Authentication token is required'));
        }

        const decoded = jwt.verify(token, process.env.jwt_secret);

        req.user = { id: decoded.userId };
        next();

    } catch (error) {
        console.log(`verification error${error.message}`);
        return next(errorHandler(500, 'Internal server error'));
    }
}