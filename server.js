const fs=require('fs');
const port=process.env.PORT||3000;
const express= require('express');
const hbs= require('hbs');
var app=express('web server/public');

app.set('view engine','hbs');
hbs.registerPartials(__dirname+ '/views/partials');
app.use(express.static(__dirname+ '/public'));

app.use((req,res,next)=>{ //middleware function
	var now=new Date().toString();
	var log=`${now}:${req.method}:${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log+ '\n',(err)=>{
		if(err){console.log('Unable to append to serverlog');}
	});
	next();
});

//app.use((req,res,next)=>{
	//res.render('maintainence.hbs');
	
//});

hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear()
});
hbs.registerHelper('scream',(text)=>{
	return text.toUpperCase();
});


app.get('/',(req,response)=>{
	//response.send('<h1>HELLO EXPRESS</h1>');
    response.render('home.hbs',{
	pageTitle:'Home Page',
	message:'WElcome to the homepage',

   
});
});

app.get('/about',(req,response)=>{
	response.render('about.hbs',{
		pageTitle:'About Page',

	});
});

app.get('/bad',(req,res)=>{
	res.send({
		errormessage:'Unable to handle request'
		});
});
app.listen(port,()=>{
	console.log(`Server is up on port:${port}`)
});