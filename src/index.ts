import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swaggerConfig'; // Import the Swagger configuration
import signinRouter from './routes/auth/signin';
import signupRouter from './routes/auth/singup';
import addGroceryRouter from './routes/grocery/add';
import { authenticateToken } from './middleware/auth';
import { isAdmin } from './middleware/is-admin';
import { prismaClient } from './utils/db';

const app = express();
const port = 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Swagger UI endpoint

app.use('/auth', signinRouter);
app.use('/auth', signupRouter);
app.use(authenticateToken);

app.use(isAdmin);
app.use('/grocery', addGroceryRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.listen(port, async () => {
    console.log(`Server is listening at http://localhost:${port}`);
    const user = await prismaClient.user.findFirst({ where: { email: 'admin@admin.com' } });
    if (!user) {
        await prismaClient.user.create({
            data: {
                email: 'admin@admin.com',
                password: 'password',
                name: 'admin',
            },
        });
    }
    console.log(user);

    console.log('database connected');
});
