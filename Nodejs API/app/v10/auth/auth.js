var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var modName = 'auth';
const _ = require('lodash')

var { login } = require('./user/login');
var { get_all_users } = require('./user/get-all-users');
var { get_user_data } = require('./user/get-user-data');

router.use(bodyParser.json());
router.use(express.static('public'));
router.use(bodyParser.urlencoded({ extended: false }));

function auth(app) {
    var logger = app.locals.logger;

    router.post('/login', (req, res) => {    //login
        login(req).then(
            (response) => {
                
                res.send(response);
            }
        ).catch(
            (err) => {
                res.status(401).send("Error");
            }
        );
    });

    router.get('/getAllUsers', (req, res) => {   //get all users
        get_all_users(req).then(
            (response) => {
                res.send(response);
            }
        ).catch(
            (err) => {
                res.status(400).send(err);
            }
        );
    });

    router.post('/getUserData', (req, res) => {      //get user data by id
        get_user_data(req).then(
            (response) => {
                res.send(response);
            }
        ).catch(
            (err) => {
                res.status(400).send(err);
            }
        );
    });

    return router;
}

module.exports = auth





