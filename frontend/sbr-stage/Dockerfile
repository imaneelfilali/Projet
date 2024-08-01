# Use the official Node.js image as the base image
FROM node:20

# Set the working directory to /frontend
WORKDIR /frontend/sbr-stage

# Copy package.json and package-lock.json to the working directory
COPY frontend/sbr-stage/package.json frontend/sbr-stage/package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY frontend/sbr-stage .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
