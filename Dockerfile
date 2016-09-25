COPY package.json /app/package.json
COPY bower.json /app/bower.json
COPY gulpfile.js /app/gulpfile.js

COPY node_modules/.bin /app/bin
COPY src /app/src
COPY public /app/public

RUN apk update && \
    cd /app && \
    npm install && \
    ./node_modules/.bin/gulp build && \
    rm -rf ./bower_components && \
    npm uninstall gulp gulp-bower gulp-clean gulp-concat gulp-istanbul gulp-jade gulp-jscs gulp-jshint gulp-mocha gulp-rev gulp-rev-replace gulp-tap gulp-uglify gulp-util gulp-livereloa jshint-stylish main-bower-files run-sequence sinon && \
    cd ./node_modules && \

WORKDIR /app
