#inherit image from node over alpine
FROM node:18-alpine3.19

# createfor our app in linux root directort
WORKDIR /app

# copy only packagejson into container's app folder
COPY package*.json /app

# restore node_modules
RUN npm i

# copy our app from local machine into /app  
COPY . /app

# ENTRYPOINT npm start
ENTRYPOINT npm start