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
 *                 description: The email address of the user to sign in.
 *                 example: example@example.com
 *               userPass:
 *                 type: string
 *                 description: The password of the user to sign in.
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successful sign-in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token for the signed-in user.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGVAdGVzdC5jb20iLCJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaXNBZG1pbiI6dHJ1ZX0.63LzYg1p9H8TJkKoeDU2n0qRYmxJzRlzFSDk9HBCrPI
 *       400:
 *         description: Invalid request or user doesn't exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message describing the reason for the failure.
 *                   example: User doesn't exist
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
signinRouter.post('/signin', async (req: Request, res: Response) => {
    try {
        const { userEmail, userPass } = req.body;

        // Check if user with the provided email exists
        const existingUser = await prismaClient.user.findFirst({
            where: {
                email: userEmail,
                password: userPass,
            },
        });
        if (!existingUser) {
            return res.status(400).json({ error: "User doesn't exist" });
        }

        // Check if the provided password matches the user's password (add your password verification logic here)
        // For simplicity, assuming the password is correct in this example
        // You should implement proper password hashing and verification

        // Generate JWT token for the signed-in user
        const token = generateToken({
            email: existingUser.email,
            userId: existingUser.id,
            isAdmin: existingUser.isAdmin,
        });

        // Send token as response
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during sign-in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default signinRouter;
