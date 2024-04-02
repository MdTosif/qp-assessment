import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express Swagger API',
            version: '1.0.0',
            description: 'A simple Express Swagger API',
        },
    },
    // Paths to files containing OpenAPI definitions
    apis: ['./src/routes/**/*.ts'],
};

export default swaggerJsdoc(options);
