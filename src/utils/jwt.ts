import jwt from 'jsonwebtoken';

// Secret key for JWT
const secretKey = 'your-secret-key';

export type JwtUserPayload = {
    userId: number;
    email: string;
    isAdmin?: boolean;
};

// Function to generate JWT token
export function generateToken(payload: JwtUserPayload | string): string {
    return jwt.sign(payload, secretKey, {
        expiresIn: '7d',
    });
}

// Function to verify and decode JWT token
export function verifyToken(token: string): string | jwt.JwtPayload | JwtUserPayload {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        throw new Error('Invalid token');
    }
}
