FROM node:19-alpine3.16
WORKDIR /opt/node-server
COPY . .
RUN npm install
ENV port=3000
EXPOSE 3000
CMD [ "npm","run","dev" ]