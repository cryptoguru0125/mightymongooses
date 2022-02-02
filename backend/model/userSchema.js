const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    allowed:{
        type:Boolean,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
});

//we are generating token
userSchema.methods.generateAuthToken=async function(){
    try{
        let token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    }
    catch(err){
        console.log(err);
    }
}

const User = mongoose.model('USER',userSchema);

module.exports=User;