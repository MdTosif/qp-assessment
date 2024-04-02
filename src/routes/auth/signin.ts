import express, { Router, Request, Response } from 'express';
import { generateToken } from '../../utils/jwt';
import { prismaClient } from '../../utils/db';

const signinRouter: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication
 */

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Sign in to the application
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userEmail:
 *                 type: string
 *               userPass:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful sign-in
 *       400:
 *         description: Invalid request
 */

signinRouter.post('/signin', async (req: Request, res: Response) => {
    try {
        const { userEmail, userPass, userName } = req.body;

        const existingUser = await prismaClient.user.findFirst({
            where: {
                email: userEmail,
            },
        });
        if (!existingUser) {
            throw new Error("User doesn't exist");
        }

        //db operations
        const token = generateToken({
            email: existingUser.email,
            userId: existingUser.id,
            isAdmin: existingUser.isAdmin,
        });

        res.status(200).json({ token });
    } catch (error: any) {
        console.log(error);

        res.status(400).json({ error: error.message || 'Some error ocurred' });
    }
});

export default signinRouter;
