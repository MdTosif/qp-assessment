import express, { Router, Request, Response } from 'express';
import { prismaClient } from '../../utils/db';

const updateGroceryRouter: Router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 * security:
 *   - bearerAuth: []
 *
 * /grocery/{groceryId}:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new grocery item
 *     tags: [Grocery]
 *     parameters:
 *       - in: path
 *         name: groceryId
 *         required: true
 *         description: The ID of the grocery item to retrieve.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the grocery item.
 *                 example: Apple
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the grocery item.
 *                 example: 5
 *     responses:
 *       200:
 *         description: Successful creation of grocery item
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The name of the grocery item.
 *                   example: Apple
 *                 quantity:
 *                   type: integer
 *                   description: The quantity of the grocery item.
 *                   example: 5
 *                 id:
 *                   type: integer
 *                   description: id of the grocery.
 *                   example: 5 
 *                  
    
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized - Only admin can perform this task
 *       500:
 *         description: Internal server error
 */

// Route to create a new grocery item
updateGroceryRouter.patch('/:groceryId', async (req: Request, res: Response) => {
    try {
        const { name, quantity } = req.body;
        const { groceryId } = req.params;

        const grocery = await prismaClient.grocery.update({
            data: {
                name,
                quantity,
            },
            where: {
                id: parseInt(groceryId),
            },
        });

        res.status(200).json({
            id: grocery.id,
            name: grocery.name,
            quantity: grocery.quantity,
        });
    } catch (error: any) {
        console.error('Error creating grocery item:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
});

export default updateGroceryRouter;
