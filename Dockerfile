FROM node:20

RUN apt-get update
RUN apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth xvfb

WORKDIR /usr/app

COPY package-lock.json ./
COPY package.json ./

RUN npm i

COPY . .

