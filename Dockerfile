FROM node:21-slim

RUN apt-get update && apt-get install -y \
    build-essential 
    
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --production

COPY . ./

CMD ["node", "index.js"]
