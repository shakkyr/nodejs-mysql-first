const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//!database
const mysql = require('mysql2');


// DB_USER / DB_PASS instead of USER / PASS: "USER" already exists on
// Linux/macOS (your login name) and dotenv does not overwrite it.
const con = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS
});

con.connect(function (err) {
    if (err) {
        console.error('Could not connect to MySQL:', err.message);
        process.exit(1);
    }
    // IF NOT EXISTS: plain CREATE DATABASE crashes on every restart after the first.
    con.query('CREATE DATABASE IF NOT EXISTS mydb', function (err) {
        if (err) {
            console.error('Could not create database:', err.message);
            process.exit(1);
        }
        console.log("Database ready");
    });
})




//middleware 
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`we are on port: ${port}`));