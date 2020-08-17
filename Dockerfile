FROM node:alpine as builder
ENV http_proxy http://10.67.1.66:3128
ENV https_proxy http://10.67.1.66:3128

WORKDIR /Erc.Households.UI
COPY package.json /Erc.Households.UI
RUN npm install
RUN npm audit fix
COPY . ./
RUN npm run build-prod

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /Erc.Households.UI/dist/erc-households-ui /usr/share/nginx/html
EXPOSE 80