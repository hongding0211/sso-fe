FROM node:16

MAINTAINER keith.dh@hotmail.com

EXPOSE 3000

WORKDIR /home/node/app

COPY ./ /home/node/app

RUN npm config set registry http://registry.npm.taobao.org

RUN npm install --force
RUN npm run build

CMD npm run start
