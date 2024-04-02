import { Response, Request, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    console.log(req.headers);

    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    const user = verifyToken(token);
    console.log(user);

    if (!user) {
        res.sendStatus(404);
    }

    res.locals.user = user;
    next();
};

export { authenticateToken };
