import express, { Router, Request, Response } from 'express';
import { prismaClient } from '../../utils/db';

const addOrderRouter: Router = express.Router();

/**
 * @swagger
 * /order:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create new grocery items in an order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 groceryId:
 *                   type: integer
 *                   description: The ID of the grocery item.
 *                   example: 1
 *                 quantity:
 *                   type: integer
 *                   description: The quantity of the grocery item.
 *                   example: 5
 *     responses:
 *       200:
 *         description: Successful creation of grocery items in the order
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   groceryId:
 *                     type: integer
 *                     description: The ID of the grocery item.
 *                     example: 1
 *                   quantity:
 *                     type: integer
 *                     description: The quantity of the grocery item.
 *                     example: 5
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */

/**
 * Route to create new grocery items in an order.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves once the request is processed.
 */
addOrderRouter.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        // Extracting order details from the request body
        const orders: { groceryId: number; quantity: number }[] = req.body;

        // Creating multiple orders in the database
        const createdOrders = await prismaClient.order.createMany({
            data: orders.map((order) => ({ ...order, userId: res.locals.user.userId })),
        });

        // Sending the created orders as response
        res.status(200).json(orders);
    } catch (error: any) {
        // Handling errors
        console.error('Error creating grocery items in the order:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
});

export default addOrderRouter;
