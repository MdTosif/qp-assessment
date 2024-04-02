import express, { Router, Request, Response } from 'express';
import { generateToken } from '../../utils/jwt';
import { Prisma, PrismaClient } from '@prisma/client';
import { prismaClient } from '../../utils/db';

const signupRouter: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Sign up to the application
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
 *               userName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful sign-up
 *       400:
 *         description: Invalid request
 */

signupRouter.post('/signup', async (req: Request, res: Response) => {
    try {
        const { userEmail, userPass, userName } = req.body;

        const existingUser = await prismaClient.user.findFirst({
            where: {
                email: userEmail,
            },
        });
        if (existingUser) {
            throw new Error('User with that email exist');
        }

        const user = await prismaClient.user.create({
            data: {
                email: userEmail,
                password: userPass,
                name: userName,
            },
        });

        if (!user) {
            throw new Error('error while creating user');
        }

        //db operations
        const token = generateToken({
            email: user.email,
            userId: user.id,
            isAdmin: user.isAdmin,
        });

        res.status(200).json({ token });
    } catch (error: any) {
        console.log(error);

        res.status(400).json({ error: error.message || 'Some error ocurred' });
    }
});

export default signupRouter;
