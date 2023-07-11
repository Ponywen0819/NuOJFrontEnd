FROM ubuntu:22.04

RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN sed 's@archive.ubuntu.com@free.nchc.org.tw@' -i /etc/apt/sources.list
RUN apt-get update && apt-get install -y curl

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash
RUN apt-get install -y nodejs
RUN node -v
RUN npm -v

RUN npm install -g pnpm

COPY . /etc/NuOJ-Front-End
WORKDIR /etc/NuOJ-Front-End

RUN pnpm install

RUN pnpm run build

CMD pnpm run start