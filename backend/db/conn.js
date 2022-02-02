const mongoose = require('mongoose');
const DB=process.env.DATABASE;

mongoose.connect(DB).then(()=>{
    console.log("Mongo DB connected");
}).catch((err)=>console.log(err));