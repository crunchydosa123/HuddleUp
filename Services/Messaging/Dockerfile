# Use Node.js LTS as base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Expose the WebSocket port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
