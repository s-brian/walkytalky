const mysql = require('mysql2');
require('dotenv').config()

//create constant database reference in promise to allow awaiting
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

//inserts message values into the database
async function insertMsg(data) {
    await pool.query("insert into messages values(?,?,?,?,?,?,?)", [0, data.roomid, data.userid, data.message, data.timestamp, data.username, data.picture]);
}

async function checkUserExist(data) {
    const result = await pool.query('select count(*) as count from users where email = ?', [data.email]);
    if (result[0][0].count == 0){
        //if email is unused, create userid
        await pool.query("insert into users values(?,?,?,?)", [0, data.name, data.email, data.picture]);
        console.log("ADDED");
    }
    else {
        console.log("SKIPPED");
    }
    //return the userid 
    const returnUser =  await pool.query("select userid from users where email = ?", [data.email]);
    return (returnUser[0][0].userid)
}

//fetches the previous messages to display on initial load
async function fetchRecentMessages(){
    const messages = await pool.query("select * from messages order by timestamp desc limit 50")
    return(messages[0]);
}



module.exports = {insertMsg, checkUserExist, fetchRecentMessages};