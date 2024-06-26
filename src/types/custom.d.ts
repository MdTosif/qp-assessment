declare global {
    declare namespace Express {
        interface Request {
            user: {
                userId: number;
                email: string;
                isAdmin?: boolean;
            };
        }
    }
}
