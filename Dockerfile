FROM node:20-alpine as dev
ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

FROM nginx as prod

COPY dist /var/www/html
COPY proxy/prod.default.conf /etc/nginx/conf.d/default.conf

ENV TZ=Asia/Tokyo

EXPOSE 80
