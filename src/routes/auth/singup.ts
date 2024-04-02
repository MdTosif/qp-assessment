import express, { Router, Request, Response } from 'express';

const signupRouter: Router = express.Router();

/**
 * @swagger
 * /hello:
 *   get:
 *     summary: Returns a hello message
 *     responses:
 *       200:
 *         description: Hello message
 */

signupRouter.post('/signup', (req: Request, res: Response) => {
    res.send('Hello from the router!');
});

export default signupRouter;