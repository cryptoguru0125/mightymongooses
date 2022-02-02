import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';

function Retailer(){
    const [UPC,setUPC]=useState();
    const [STATE,setSTATE]= useState(0);  
    const [QUALITY,setQUALITY]=useState();
    const [ownerID,setOwnerID]=useState();
    const [retailerID,setRetailerID]=useState();
    var retailerData;
    const navigate=useNavigate();
    const callRetailer=async()=>{
        try{
            const res= await fetch('/retailer',{
                method:'GET',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json'
                },
                credentials:'include'
            });
            retailerData=await res.json();
            console.log("retailer data=",retailerData);

            if(!res.status===200){
                const error=new Error(res.error);
                throw error;
            }
            if(retailerData.role!="retailer" && retailerData._id!="61d97bc1789031375b6a6c66"){
                window.alert("You role is not of a retailer");
                navigate('/login');
            }
            else if(retailerData.allowed==false){
                window.alert("You are not added yet by central authority");
                navigate('/login');
            }

        }catch(err){
            console.log("err=",err);
            navigate('/login');
        }
    }
    useEffect(()=>{
        callRetailer();
    },[]);
    const paperStyle={padding :30,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}

    const handleClick=(num)=>{
        setSTATE(num);
        setRetailerID(retailerData.email);
        setOwnerID(retailerData.email);
    }

    const UpdateStateAndQualityAndRetailer=async(e)=>{
        const obj={UPC,STATE,QUALITY,retailerID,ownerID};
        e.preventDefault();
        console.log("upc,state,quality,retailerID,ownerID=",UPC,STATE,QUALITY,retailerID,ownerID,obj);
        const res= await fetch('/updatestateandqualityandretailer',{
            method:'PATCH',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(obj)
        });
        const data=await res.json();
        console.log("retailer data",data);
        if(res.status===422 || !data){
            window.alert("Can't update the state");
            console.log("Can't update the state");
            window.location.reload();
            
        }
        else if(res.status===400){
            window.alert("Enter UPC and Quality");
            console.log("Enter UPC and Quality");
        }
        else{
            window.alert("State updated successfully");
            console.log("State updated successfully");
            window.location.reload();
        }
    }

    const UpdateState=async(e)=>{
        const obj={UPC,STATE};
        e.preventDefault();
        console.log("upc,state=",UPC,STATE,obj);
        const res= await fetch('/updatestate',{
            method:'PATCH',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(obj)
        });
        const data=await res.json();
        console.log("process data",data);
        if(res.status===422 || !data){
            window.alert("Can't update the state");
            console.log("Can't update the state");
            window.location.reload();
            
        }
        else if(res.status===400){
            window.alert("Enter UPC");
            console.log("Enter UPC");
        }
        else{
            window.alert("State updated successfully");
            console.log("State updated successfully");
            window.location.reload();
        }
        
    }

    return (
        <Grid container spacing={1}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LooksOneIcon/></Avatar>
                    <h2>Purchase Fish</h2>
                </Grid>
                <TextField label='UPC' placeholder='Enter UPC' name="upc" value={UPC} onChange={(e)=>{setUPC(e.target.value);handleClick(6);}} fullWidth required/>
                <FormControl fullWidth required>
                <InputLabel id="demo-simple-select-label">Quality</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={QUALITY}
                        name="quality"
                        label="quality"
                        onChange={(e)=>{setQUALITY(e.target.value);}}
                    >
                        <MenuItem value="good">Good</MenuItem>
                        <MenuItem value="poor">Poor</MenuItem>
                    </Select>
                    </FormControl>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={(e)=>{UpdateStateAndQualityAndRetailer(e);}} fullWidth>Purchase</Button>
            </Paper>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LooksTwoIcon/></Avatar>
                    <h2>Sell Fish</h2>
                </Grid>
                <TextField label='UPC' placeholder='Enter UPC' name="upc" onChange={(e)=>{setUPC(e.target.value);handleClick(7);}}  fullWidth required/>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={(e)=>{UpdateState(e);}}  fullWidth>Sell</Button>
            </Paper>
        </Grid>
    )
}

export default Retailer
