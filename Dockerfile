FROM node:22 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./   

# Install app dependencies
RUN npm install

# Copy source code and Prisma schema
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

FROM node:22

# Create app directory
WORKDIR /app

# Copy package files
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built application
COPY --from=builder /app/dist ./dist

# Copy Prisma directory (schema and migrations)
COPY --from=builder /app/prisma ./prisma

# Copy node_modules that includes generated Prisma client
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Generate Prisma client in production image
RUN npx prisma generate

EXPOSE 3000

# Use a startup script to run migrations and start the app
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]