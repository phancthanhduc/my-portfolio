# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy server files
COPY package*.json ./
COPY prisma ./prisma/
COPY src ./src/

RUN npm ci
RUN npx prisma generate

RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY package*.json ./

ENV NODE_ENV=production

EXPOSE 3001

CMD ["node", "dist/index.js"]
