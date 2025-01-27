# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if it exists) to the container
COPY package*.json ./

# Install dependencies, including devDependencies like nodemon
RUN npm install --legacy-peer-deps  # Ensure compatibility with peer dependencies

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Command to run the application (starts nodemon in dev mode)
CMD ["npm", "run", "dev"]
