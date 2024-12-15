FROM node:20

WORKDIR /app

COPY  package.json .

ARG NODE_ENV

RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi

# If in development, install dev dependencies like nodemon
# RUN if [ "$NODE_ENV" = "development" ]; then npm install --global nodemon; fi


COPY . ./

ENV PORT 4000

EXPOSE $PORT

# Default command: if in development, run nodemon; otherwise, run node server.js
# CMD if [ "$NODE_ENV" = "development" ]; then nodemon server.js; else node server.js; fi

CMD [ "node","server.js"]