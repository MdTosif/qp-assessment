import express, { Router, Request, Response } from 'express';

const signinRouter: Router = express.Router();

/**
 * @swagger
 * /hello:
 *   get:
 *     summary: Returns a hello message
 *     responses:
 *       200:
 *         description: Hello message
 */

signinRouter.post('/signin', (req: Request, res: Response) => {
    res.send('Hello from the router!');
});

export default signinRouter;