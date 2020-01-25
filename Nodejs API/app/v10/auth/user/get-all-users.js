var express = require('express')
var _ = require('lodash');
const mysql = require('mysql');
const mysqlconfig = require('../../../../config/dev.json');
var mysqlConnection = mysql.createConnection(mysqlconfig.mysql);

mysqlConnection.connect((err) => {
    if (!err){
       // console.log('Connection Established Successfully');
     } else{
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
     }
});

function get_all_users(req) { 

    return new Promise(function (fulfill, reject) {
        var sortedUsers=function(users){    //User Detetail Sorted by User Name 
            const sortedUsers = _.orderBy(users, [user => user.name.toLowerCase()], ['asc']);
            return sortedUsers
        }
        query='SELECT * FROM User'
        mysqlConnection.query(query, (err, response) => {
            if (!err) {    
                fulfill(sortedUsers(response));
            } else {
                reject(err)
            }
        })
    })
}

module.exports = {
    get_all_users
}

