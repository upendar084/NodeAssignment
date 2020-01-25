const express = require('express')
const mysql = require('mysql');
const app = express()
const _ = require('lodash')
const modName = 'app'
const logger = require('./common/logger.js')
const endpoints=require('./endpoints');
const swaggerDoc=require('./swaggerDoc');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

 endpoints(app);
 swaggerDoc(app)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methodss", 'GET,POST,PUT,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

var config;
if (process.env.NODE_ENV == 'dev')
    config = require('./config/dev.json');

app.locals.config = config;
app.locals.logger = logger;

//Load routes and Modules
//localhost:8000/ms/v10/auth/
_.forEach(config.modules, function (modValue, modName) {
    _.forEach(modValue, function (value, key) {
        _.forEach(value, function (version) {
            app.use('/ms/' + version + '/' + modName, require('./app/' + version + '/' + modName + '/' + modName + '.js')(app));
        });
    });
});

app.listen(config.port, function () {
    logger.log(logger.SILLY, modName, 'app listening on port::' + config.port);
})


