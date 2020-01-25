var express = require('express')
var _ = require('lodash');
const mysql = require('mysql');
const mysqlconfig = require('../../../../config/dev.json');

var mysqlConnection = mysql.createConnection(mysqlconfig.mysql);
mysqlConnection.connect((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});
function login(req) { 
   /*
       request Object
        {
            "email":"Fred@123",
            "password":"68651"
        }
        */
    return new Promise(function (fulfill, reject){

            let sqlQuery = "select id,name,email,role from User where email=? and password=?";
            let query = mysql.format(sqlQuery,[req.body.email,req.body.password]);
            mysqlConnection.query(query, (err, response) => {
                if (!err){
                if(response.length>0){
                    fulfill(response[0]);
                }else{
                    reject("Invalid credentials")
                }
            }else{
                    reject("Invalid credentials!")
            }
            })
         }
        )
}

module.exports = {
    login
}
