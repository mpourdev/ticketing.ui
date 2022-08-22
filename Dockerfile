# Stage 1: Build The Angular Docker Image
FROM node:16 AS build
WORKDIR /app

COPY package*.json /app/

RUN npm install
COPY . /app

RUN npm run build -- --outputPath=./dist/out --configuration production


# Stage 2, use the compiled app, ready for production with Nginx
FROM nginx
RUN apt-get update && apt-get install -y nginx-extras && apt-get install -y vim

RUN rm /etc/nginx/sites-enabled/default

COPY --from=build /app/dist/out/ /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
