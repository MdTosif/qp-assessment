import { RequestHandler } from 'express';

// Middleware to check if the user is an admin
export const isAdmin: RequestHandler = (req, res, next) => {
    if (!res.locals.user.isAdmin) {
        return res.status(401).json({ error: 'Only admin can perform this task' });
    }
    next();
};
