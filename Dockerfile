# Use official Node.js LTS image
FROM node:18

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port (default 3000)
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
