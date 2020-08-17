const express = require("express");
const mysql = require("mysql");
const router = express.Router();

var mysqlConnection = mysql.createConnection({
	connectionLimit:10,
	password:'',
	user:'root',
	database:'node',
	host:'localhost',
	port:'3306',
	multipleStatements:true
});

mysqlConnection.connect((err)=>{
	if(!err)
		console.log('connected');
	else
		console.log("error" + err.message);
})

router.get("/users",(req,res)=>{
    mysqlConnection.query("SELECT * FROM `user`",[],(err,rows,field)=>{
        if(!err)
            res.send(rows)
    });
})

router.post("/users",(req,res)=>{
    console.log(req.body.mark+" "+req.body.nb_places);
    mysqlConnection.query("insert into user(`firstname`) VALUES (?)",[req.body.firstname],(err,rows,field)=>{
        if(!err)
            res.redirect("/users")
        else
            res.send(err.message)
    });
})

module.exports = router