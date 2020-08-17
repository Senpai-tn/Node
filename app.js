const express = require("express");
const mysql = require("mysql");
const Joi = require("joi");
const cors = require('cors');
const app = express();
const mongoose = require("mongoose")
require('dotenv/config')

console.log(process.env.DB_Connection)




mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true , useUnifiedTopology: true } ,() => console.log('connected to BD')).catch(error => handleError(error));
const router = require("./server/routes/index");
const routerCars = require('./server/routes/cars');
app.use(router)
app.use(routerCars)
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
		console.log('connected to mySQL');
	else
		console.log("error" + err.message);
})

app.get("/",(req,res)=>
	{
		mysqlConnection.query("select * from user",(err,rows,field)=>{
			if(rows !== [])
				res.send(rows);
			else
				res.status(404).send("not found");
		});
	}
);


app.get("/:id",(req,res)=>{
	mysqlConnection.query("select * from user where id = ?",[req.params.id],(err,rows,field)=>{
		if(rows.length > 0 )
		{
			res.send(rows);
		}
		else
			res.send(404)	
			
	});
});

app.post("/",(req,res)=>
{
	const schema = {
		name:Joi.string().min(3).required()
	}

	const result = Joi.validate(req.body,schema)
	if(!result.error)
		{
			mysqlConnection.query("insert into user(firstname) values(?)",[req.body.name],(err,rows,field)=>{
				if(!err)
					res.redirect("/")
			});
		}
	else
		res.send(result.error.details[0].message)
});



app.put("/",(req,res)=>{
	mysqlConnection.query("update user set name=? where id=? ",[req.body.name, req.body.id],(err,rows,field)=>{
		if(!err)
			res.redirect("/")
	});
})

app.get("/delete/:id",(req,res)=>{
	mysqlConnection.query("delete from user where id=? ",[req.params.id],(err,rows,field)=>{
		if(!err)
		{
			res.redirect("/")
		}
		
			
	});
})

function cars()
{
	console.log("hello");
}

const port = process.env.PORT || 3000 ; 
app.listen(port,()=> console.log(`${port}`));
