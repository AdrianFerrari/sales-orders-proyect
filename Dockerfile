FROM node:18-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --production=false
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]