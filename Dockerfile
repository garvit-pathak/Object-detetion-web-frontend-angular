### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:10-alpine as builder
WORKDIR /app

COPY package*.json /app/
RUN npm config set proxy http://squid.avl.com:8080
RUN npm install

COPY ./ /app/

ARG configuration=production

RUN npm run build -- --output-path=./dist/out --configuration $configuration
RUN npm run postbuild
### STAGE 2: Setup ###

FROM nginx:stable-alpine

## Copy our default nginx config
COPY nginx.conf /etc/nginx/nginx.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /app/dist/out/ /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]


#FROM nginx:stable-alpine
# LABEL version="1.0"

# COPY nginx.conf /etc/nginx/nginx.conf

# WORKDIR /usr/share/nginx/html
# COPY dist/xtract-ui/ .
