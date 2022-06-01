const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//!database
const mysql = require('mysql2');


const con = mysql.createConnection({
    host:'localhost',
    user: process.env.USER,
    password: process.env.PASS
});

con.connect(function (err) {
    if (err) throw err;
    con.query('CREATE DATABASE mydb',function (err, result) {
        if (err) throw err;
        console.log("Database created");
      });
})




//middleware 
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`we are on port: ${port}`));