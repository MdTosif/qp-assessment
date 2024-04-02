import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.patch('/', (req: Request, res: Response) => {
    res.send('Hello from the router!');
});

export default router;