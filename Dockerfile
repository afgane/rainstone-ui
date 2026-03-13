FROM node:22-alpine as build

WORKDIR /app

ARG VITE_APP_BASE_URL=/
ENV VITE_APP_BASE_URL=$VITE_APP_BASE_URL

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine as production

COPY --from=build /app/dist /usr/share/nginx/html
COPY config.js /usr/share/nginx/html/config.js
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
