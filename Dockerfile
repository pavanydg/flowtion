# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --force --no-cache

COPY . .

# Optional: Build the Next.js app
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
