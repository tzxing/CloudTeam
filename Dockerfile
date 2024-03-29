FROM node:current-alpine AS builder

COPY package.json package-lock.json tsconfig.json postcss.config.js .eslintrc.js vue.config.js /frontend/
WORKDIR /frontend/
RUN npm --registry https://registry.npm.taobao.org install
COPY public /frontend/public
COPY src /frontend/src
RUN npm run build

FROM nginx:mainline-alpine
LABEL Author="WANG Guan"

RUN echo -e "https://mirror.tuna.tsinghua.edu.cn/alpine/latest-stable/main\nhttps://mirror.tuna.tsinghua.edu.cn/alpine/latest-stable/community" > /etc/apk/repositories \
    && apk update
COPY --from=builder /frontend/dist /www
COPY conf/nginx.conf /etc/nginx/nginx.conf


ENTRYPOINT ["/usr/sbin/nginx", "-c", "/etc/nginx/nginx.conf", "-g", "daemon off;"]