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

router.get("/cars",(req,res)=>{
    mysqlConnection.query("SELECT * FROM `car`",[],(err,rows,field)=>{
        if(!err)
            res.send(rows)
    });
})

router.post("/cars",(req,res)=>{
    console.log(req.body.mark+" "+req.body.nb_places);
    mysqlConnection.query("insert into car(`mark`,`nb_places`) VALUES (?,?)",[req.body.mark,req.body.nb_places],(err,rows,field)=>{
        if(!err)
            res.redirect("/cars")
        else
            res.send(err.message)
    });
})

module.exports = router