const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const itemSchema = new mongoose.Schema({
    upc:{
        type:String,
        required:true
    },
    fishName:{
        type:String,
        required:true
    },
    state:{
        type:Number,
        required:true,
    },
    quality:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    originLatitude:{
        type:String,
        required:true
    },
    originLongitude:{
        type:String,
        required:true
    },
    ownerID:{
        type:String,
        required:true
    },
    producerID:{
        type:String,
        required:true
    },
    distributorID:{
        type:String,
        required:true
    },
    retailerID:{
        type:String,
        required:true
    },
    consumerID:{
        type:String,
        required:true
    }   
});

//we are generating token
// userSchema.methods.generateAuthToken=async function(){
//     try{
//         let token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
//         this.tokens=this.tokens.concat({token:token});
//         await this.save();
//         return token;
//     }
//     catch(err){
//         console.log(err);
//     }
// }

const Item = mongoose.model('ITEM',itemSchema);

module.exports=Item;