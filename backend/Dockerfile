FROM node
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["npm","run", "start"]

# docker build -t hoo-runs-api .
#docker run -it -p 8080:8080 hoo-runs-api