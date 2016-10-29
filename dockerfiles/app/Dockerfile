FROM node:6.9.1

# https://github.com/nodejs/docker-node#verbosity
ENV NPM_CONFIG_LOGLEVEL warn

RUN npm install -g yarn

WORKDIR /app

ENTRYPOINT ["yarn"]
