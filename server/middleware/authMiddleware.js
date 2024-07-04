import { UnauthenticatedError, UnauthorizedError } from "../errors/customErrors.js";
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        throw new UnauthenticatedError('xác thực không hợp lệ');
    }

    try {
        const { userId, role } = verifyJWT(token);
        req.user = { userId, role };
        next();
    } catch (error) {
        throw new UnauthenticatedError('xác thực không hợp lệ');
    }
};

export const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError('Không được phép truy cập');
        }
        next();
    };
};