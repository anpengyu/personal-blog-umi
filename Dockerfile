FROM node:alpine as builder

WORKDIR /usr/src/app/
USER root

# 中国镜像源
RUN npm i -g mirror-config-china --registry=https://registry.npm.taobao.org --unsafe-perm=true --allow-root

# npm install
COPY package.json ./
# COPY package-lock.json ./

RUN npm i

COPY ./ ./

# RUN npm run test:all

RUN DEBUG=umi* npm run build
# 打包生成的目录假定为 ./dist

#RUN  gzip -9 -k -r ./dist
RUN  find dist -name "*" -type f -print0 | xargs -0 gzip -9 -k


# FROM nginx:alpine

# WORKDIR /usr/share/nginx/html/

# COPY nginx.conf /etc/nginx/conf.d/default.conf

# 复制上一个阶段的镜像 ./dist 中的目录
# COPY --from=builder /usr/src/app/dist  /usr/share/nginx/html/

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
