FROM node:20-slim as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build -- --output-path=./dist/app --configuration production

FROM nginx:alpine as production

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/app /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]