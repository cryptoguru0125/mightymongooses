const express=require('express');
const router=express.Router();
const authenticate = require('../middleware/authenticate');

router.get('/',(req,res)=>{
    res.send("home from auth.js");
})

require("../db/conn");
const User=require("../model/userSchema");
const Item=require("../model/itemSchema");

router.post('/register',async(req,res)=>{
    const {name, email, phone, role, password, allowed}=req.body;
    if( !name || !email || !phone || !role || !password){
        res.status(422).json({error:"Please fill all the details"});
    }
    try{
        const userExist= await User.findOne({email:email});
        if(userExist){
            return res.status(422).json({error:"email already registered"});
        }
        const user=new User({name, email, phone, role, password,allowed});
        await user.save();
        res.status(201).json({message:"User registered successfully"});

    }catch(err){
        console.log(err)
    }
})

router.post('/fishOut',async(req,res)=>{
    const {upc, fishName, state, quality, price, originLatitude, originLongitude, ownerID, producerID,
        distributorID,retailerID,consumerID}=req.body;
    if( !upc || !fishName || !originLatitude || !originLongitude || !price || !state || !quality){
        res.status(422).json({error:"Please fill all the details"});
    }
    try{
        const upcExist= await Item.findOne({upc:upc});
        if(upcExist){
            return res.status(421).json({error:"create new upc"});
        }
        const item=new Item({upc, fishName, state, quality, price, originLatitude, originLongitude, ownerID, producerID,
            distributorID,retailerID,consumerID});
        await item.save();
        res.status(201).json({message:"Fished Out"});

    }catch(err){
        console.log("fished out error=",err)
    }
})

router.post('/signin',async(req,res)=>{
    try{
        let token;
        const {email, password}=req.body;
        if( !email || !password ){
            res.status(400).json({error:"Please fill all the details"});
        }
        const userExist= await User.findOne({email:email});
        console.log("userexist",userExist);
        if(userExist){
            console.log("userExist=",userExist);
            

            token= await userExist.generateAuthToken();
            console.log("token=",token);
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+25892000000),
                httpOnly:true
            });
            res.json({message:"User logged in"});
        
        }else{
            res.status(400).json({message:"Invalid username or password"});
        }
    }catch(err){
        console.log(err);
    }
})

router.patch('/updatestate',async(req,res)=>{
    try{
        console.log("backend=",req);
        const {UPC,STATE}=req.body;
        if(!UPC){
            res.status(400).json("Please enter UPC");
        }
        const itemExist=await Item.findOne({upc:UPC});
        if(itemExist){
            console.log("itemExist=",itemExist);
            const _state=itemExist.state;
            if(STATE-_state==1){
                itemExist.state=STATE;
                await itemExist.save();
                console.log("state updated");
                res.status(201).json({message:"State updated"});
            }
            else{
                res.status(422).json({message:"State can't be updated"});
            }
        }else{
            res.status(422).json({message:"Item doesn't exist"});
        }

    }catch(err){
        console.log("update state error=",err);
    }
})

router.patch('/updatestateandqualityanddistributor',async(req,res)=>{
    try{
        console.log("backend=",req);
        const {UPC,STATE,QUALITY, distributorID, ownerID}=req.body;
        if(!UPC || !QUALITY){
            res.status(400).json("Please enter UPC and Quality");
        }
        const itemExist=await Item.findOne({upc:UPC});
        if(itemExist){
            console.log("itemExist distributor=",itemExist);
            const _state=itemExist.state;
            if(STATE-_state==1){
                itemExist.state=STATE;
                itemExist.quality=QUALITY;
                itemExist.distributorID=distributorID;
                itemExist.ownerID=ownerID;
                await itemExist.save();
                console.log("State and quality updated");
                res.status(201).json({message:"State and quality updated"});
            }
            else{
                res.status(422).json({message:"State and quality can't be updated"});
            }
        }else{
            res.status(422).json({message:"Item doesn't exist"});
        }

    }catch(err){
        console.log("distributor update state error=",err);
    }
})

router.patch('/updatestateandqualityandretailer',async(req,res)=>{
    try{
        console.log("backend=",req);
        const {UPC,STATE,QUALITY, retailerID, ownerID}=req.body;
        if(!UPC || !QUALITY){
            res.status(400).json("Please enter UPC and Quality");
        }
        const itemExist=await Item.findOne({upc:UPC});
        if(itemExist){
            console.log("itemExist retailer=",itemExist);
            const _state=itemExist.state;
            if(STATE-_state==1){
                itemExist.state=STATE;
                itemExist.quality=QUALITY;
                itemExist.retailerID=retailerID;
                itemExist.ownerID=ownerID;
                await itemExist.save();
                console.log("State and quality updated");
                res.status(201).json({message:"State and quality updated"});
            }
            else{
                res.status(422).json({message:"State and quality can't be updated"});
            }
        }else{
            res.status(422).json({message:"Item doesn't exist"});
        }

    }catch(err){
        console.log("retailer update state error=",err);
    }
})

router.patch('/updatestateandqualityandconsumer',async(req,res)=>{
    try{
        console.log("backend=",req);
        const {UPC,STATE,QUALITY, consumerID, ownerID}=req.body;
        if(!UPC || !QUALITY){
            res.status(400).json("Please enter UPC and Quality");
        }
        const itemExist=await Item.findOne({upc:UPC});
        if(itemExist){
            console.log("itemExist consumer=",itemExist);
            const _state=itemExist.state;
            if(STATE-_state==1){
                itemExist.state=STATE;
                itemExist.quality=QUALITY;
                itemExist.consumerID=consumerID;
                itemExist.ownerID=ownerID;
                await itemExist.save();
                console.log("State and quality updated");
                res.status(201).json({message:"State and quality updated"});
            }
            else{
                res.status(422).json({message:"State and quality can't be updated"});
            }
        }else{
            res.status(422).json({message:"Item doesn't exist"});
        }

    }catch(err){
        console.log("consumer update state error=",err);
    }
})

router.patch('/adduser',async(req,res)=>{
    try{
        console.log("adduser backend req=",req.body);
        const userExist=await User.findOne({_id:req.body._id});
        if(userExist){
            console.log("userExist usercard",userExist);
            userExist.allowed=true;
            await userExist.save();
            console.log("User successfully added");
            res.status(201).json({message:"User successfully added"});
        }else{
            res.status(422).json({message:"Something went wrong"});
        }
    }catch(err){
        console.log("usercard err=",err);
    }
})

router.patch('/removeuser',async(req,res)=>{
    try{
        console.log("removeuser backend req=",req.body);
        const userExist=await User.findOne({_id:req.body._id});
        if(userExist){
            console.log("userExist usercard",userExist);
            userExist.allowed=false;
            await userExist.save();
            console.log("User successfully removed");
            res.status(201).json({message:"User successfully removed"});
        }else{
            res.status(422).json({message:"Something went wrong"});
        }
    }catch(err){
        console.log("usercard err=",err);
    }
})

router.get('/producer',authenticate,(req,res)=>{
    console.log("producer");
    res.send(req.rootUser);
})

router.get('/distributor',authenticate,(req,res)=>{
    console.log("distributor");
    res.send(req.rootUser);
})

router.get('/retailer',authenticate,(req,res)=>{
    console.log("retailer");
    res.send(req.rootUser);
})

router.get('/consumer',authenticate,(req,res)=>{
    console.log("consumer");
    res.send(req.rootUser);
})

router.get('/track',authenticate,(req,res)=>{
    console.log("track");
    res.send(req.rootUser);
})

router.get('/centralauthority',authenticate,(req,res)=>{
    console.log("centralauthority");
    res.send(req.rootUser);
})

router.get('/callusers',(req,res)=>{
    console.log("trying to get users");
    User.find({},(err,users)=>{
        if(err){
            res.send("something went wrong");
        }
        res.json(users);
    })
})

router.get('/trackItem/:id',async(req,res)=>{
    try{
        console.log("track item backend=",req);
        console.log("params=",req.params['id']);
        var UPC=req.params['id'];
        UPC=UPC.replace(/:/g,'');
        console.log("upc backend",UPC);
        if(UPC===undefined){
            res.status(400).json("Please enter UPC");
        }
        
        const itemExist=await Item.findOne({upc:UPC});
        if(itemExist){
            console.log("itemexist in track  item",itemExist);
            res.status(201).send(itemExist);
        }
        else{
            res.status(422).json({message:"Item doesn't exist"});
        }
    }catch(err){
        console.log("track item error",err);
    }
})



module.exports = router;