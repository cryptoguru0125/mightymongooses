const express = require('express');
const dotenv= require('dotenv');
const app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());
// const User=require('./model/userSchema');

dotenv.config({path:'./config.env'});
require('./db/conn');

//for json.stringify on terminal printing res of json format
app.use(express.json());
//replacing app.get
app.use(require('./router/auth'));

const PORT=process.env.PORT;




// app.get('/',(req,res)=>{
//     res.send("Home");
// });
// app.get('/about',middleware,(req,res)=>{
//     console.log("About");
//     res.send("About");
// });
// app.get('/contact',(req,res)=>{
//     res.send("Contact");
// });
// app.get('/signin',(req,res)=>{
//     res.send("Contact");
// });
// app.get('/signup',(req,res)=>{
//     res.send("Contact");
// });
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})