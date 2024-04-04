import express, { Router, Request, Response } from 'express';
import { prismaClient } from '../../utils/db';

const deleteGroceryRouter: Router = express.Router();

/**
 * @swagger
 * /grocery/{groceryId}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve details of a grocery item
 *     tags: [Grocery]
 *     parameters:
 *       - in: path
 *         name: groceryId
 *         required: true
 *         description: The ID of the grocery item to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful retrieval of grocery item details
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
 *       404:
 *         description: Grocery item not found
 *       500:
 *         description: Internal server error
 */

// Route to retrieve details of a grocery item by ID
deleteGroceryRouter.delete('/:groceryId', async (req: Request, res: Response) => {
    try {
        const { groceryId } = req.params;

        const grocery = await prismaClient.grocery.delete({
            where: {
                id: parseInt(groceryId),
            },
        });

        if (!grocery) {
            return res.status(404).json({ error: 'Grocery item not found' });
        }

        res.status(200).json({ message: `${grocery.name} got deleted` });
    } catch (error: any) {
        console.error('Error retrieving grocery item details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default deleteGroceryRouter;
