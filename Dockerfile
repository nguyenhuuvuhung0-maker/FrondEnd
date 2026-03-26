FROM node:20-alpine

WORKDIR /app

# Copy package trước để cache
COPY package*.json ./

RUN npm install

# Copy toàn bộ code
COPY . .

# Build project (TypeScript → JS)
RUN npm run build

# Mở port
EXPOSE 4000
CMD ["npm", "start"]