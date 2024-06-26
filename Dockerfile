# Use Node.js as base image
FROM node:19-bullseye

# Set the working directory in the container
WORKDIR /usr/src/app


# Install Prisma globally
RUN npm install -g prisma

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .


# Generate Prisma client
RUN prisma generate

# Build TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the server
CMD ["npm", "start"]
