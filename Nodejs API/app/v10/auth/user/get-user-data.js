

var express = require('express')
var _ = require('lodash');
const mysql = require('mysql');
const mysqlconfig = require('../../../../config/dev.json');
var mysqlConnection = mysql.createConnection(mysqlconfig.mysql);
mysqlConnection.connect((err) => {
    if (!err) {
      //  console.log('Connection Established Successfully');
     } else{
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
     }
});

function get_user_data(req) { 
     /*
       request Object
        {
            "userId":2
        }
        */
    return new Promise(function (fulfill, reject){
        let sqlQuery = "SELECT * FROM User Where id=?";
        let query = mysql.format(sqlQuery,[req.body.userId]);
        mysqlConnection.query(query, (err, response) => {
            if (!err)
                fulfill(response[0]);
            else
                reject(err)
        })
         }
        )
}

module.exports = {
    get_user_data
}
