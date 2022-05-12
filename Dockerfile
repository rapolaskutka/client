FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i --legacy-peer-deps
RUN npm run format
CMD ["npm", "run", "start"]