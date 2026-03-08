# -------------- Build stage --------------
FROM node:20-alpine AS builder

WORKDIR /app

# copy package files first (better caching)
COPY package.json package-lock.json ./

RUN npm install

# copy source code
COPY . .

# build the app
RUN npm run build


# -------------- Production stage --------------
FROM nginx:alpine

# copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# expose port
EXPOSE 80

# start nginx
CMD ["nginx", "-g", "daemon off;"]
