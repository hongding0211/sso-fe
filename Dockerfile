FROM node:16

MAINTAINER keith.dh@hotmail.com

EXPOSE 3000

WORKDIR /home/node/app

COPY ./ /home/node/app

RUN npm config set registry http://mirrors.cloud.tencent.com/npm/
RUN npm install
RUN npm run build

CMD npm run start
