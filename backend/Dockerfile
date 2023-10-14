FROM node:18-slim AS builder

# For compatibility with M1 Macs
RUN apt-get update && \
    apt-get install -y procps && \
    apt-get install -y openssl && \
    apt-get install -y libc6 && \
    apt-get install -y python3 make g++ && \
    apt-get install -y libpcsclite-dev

# Create app directory
WORKDIR /app

# npm install files
COPY package*.json ./
COPY prisma ./app/prisma/

# Install app dependencies
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:18-slim

RUN apt-get update && \
    apt-get install -y procps && \
    apt-get install -y openssl && \
    apt-get install -y libc6 && \
    apt-get install -y python3 make g++ && \
    apt-get install -y libpcsclite-dev

ENV NODE_ENV production

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma/dev.db ./dev.db

CMD [ "npm", "run", "start:prod" ]