import express, { Router, Request, Response } from 'express';
import { generateToken } from '../../utils/jwt';
import { PrismaClient } from '@prisma/client';
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
 *                 description: The email address of the user to sign up.
 *                 example: example@example.com
 *               userPass:
 *                 type: string
 *                 description: The password of the user to sign up.
 *                 example: password123
 *               userName:
 *                 type: string
 *                 description: The name of the user to sign up.
 *                 example: John Doe
 *     responses:
 *       200:
 *         description: Successful sign-up
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token for the newly signed-up user.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGVAdGVzdC5jb20iLCJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaXNBZG1pbiI6dHJ1ZX0.63LzYg1p9H8TJkKoeDU2n0qRYmxJzRlzFSDk9HBCrPI
 *       400:
 *         description: Invalid request or user with the provided email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message describing the reason for the failure.
 *                   example: User with that email already exists
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message describing the internal server error.
 *                   example: Some error occurred
 */
signupRouter.post('/signup', async (req: Request, res: Response) => {
    try {
        const { userEmail, userPass, userName } = req.body;

        // Check if user with the provided email already exists
        const existingUser = await prismaClient.user.findFirst({
            where: {
                email: userEmail,
            },
        });
        if (existingUser) {
            return res.status(400).json({ error: 'User with that email already exists' });
        }

        // Create a new user
        const newUser = await prismaClient.user.create({
            data: {
                email: userEmail,
                password: userPass,
                name: userName,
            },
        });

        // Generate JWT token for the newly signed-up user
        const token = generateToken({
            email: newUser.email,
            userId: newUser.id,
            isAdmin: newUser.isAdmin,
        });

        // Send token as response
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during sign-up:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default signupRouter;
