FROM node:alpine as builder
ENV http_proxy http://10.67.1.66:3128
ENV https_proxy http://10.67.1.66:3128

WORKDIR /Erc.Households.UI
COPY package.json /Erc.Households.UI
RUN npm install
RUN npm update
RUN npm audit fix
COPY . ./
RUN npm run build-prod

FROM nginx:alpine
COPY --from=builder /Erc.Households.UI/dist/erc-households-ui /usr/share/nginx/html
EXPOSE 80