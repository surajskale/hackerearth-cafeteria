const express = require("express");
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const Data = require('./models/data');
const path = require('path');


const app = express();

// Configuring database
const db = require('./config/keys').MongoURI;
// Connecting database
mongoose.connect(db , {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: true
})
.then(console.log('Database connected'))
.catch(err => console.log('Error connecting database: ' + err));

app.use(cookieSession({ secret: 'qwertyuioasdfghjkxcvbnm' }));

app.use(express.urlencoded({
    extended: true
  }))

app.use(express.json());

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname+'/index.html'));  

});

app.get('/register',(req,res)=>{
  res.sendFile(path.join(__dirname+'/register.html'));  

});

app.get('/order/:item1/:item2',(req,res)=>{
  if(!req.session.email)
    res.redirect('/register');
  res.write('<html><head></head><body style="text-align: center;">');
  res.write('<h1>Order Preview</h1>');
  res.write(`<p>Full Name = ${req.session.fullName}</p>`);
  res.write(`<p>Organisation Name = ${req.session.orgName}</p>`);
  res.write(`<p>Employee ID = ${req.session.empId}</p>`);
  res.write(`<p>Mobile No. = ${req.session.mobNum}</p>`);
  res.write(`<p>Email = ${req.session.email}</p>`);
  res.write(`<p>Count of Item1 = ${req.params.item1}</p>`);
  res.write(`<p>Count of Item2 = ${req.params.item2}</p>`);
  res.write(`<a href="/" ><button> Home </button></a>`);
  res.end('</body></html>');

  NewData = new Data();
  NewData.name = req.session.fullName;
  NewData.organisationName = req.session.orgName;
  NewData.employeeId = req.session.empId;
  NewData.mobileNo = req.session.mobNum;
  NewData.email = req.session.email;
  NewData.item1 = req.params.item1;
  NewData.item2 = req.params.item2;
  
  NewData.save((err, docs) =>{
    if(err){
        console.log('Error in todo.js in post ' + err);
    } 
});

});

app.post('/register/assign',(req,res)=>{
  //registered data received
  console.log(req.body);
  req.session.fullName = req.body.fullName;
  req.session.orgName = req.body.orgName;
  req.session.empId = req.body.empId;
  req.session.mobNum = req.body.mobNum;
  req.session.email = req.body.email;
  res.redirect('/register/menu');
});

app.get('/register/menu',(req,res)=>{
  if(!req.session.email)
    res.redirect('/register');
  res.sendFile(path.join(__dirname+'/menu.html'));  
});

const port = process.env.PORT || 3001 ;
app.listen(port , () => console.log(`Listening on port ${port}...`));


