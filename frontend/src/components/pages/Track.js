import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link,  FormControl, InputLabel, Select, MenuItem  } from '@material-ui/core';
import AssessmentIcon from '@material-ui/icons/Assessment';

function Track() {
    const [item, setItem]=useState({upc:"", fishName:"", state:"", quality:"", price:"", originLatitude:"", originLongitude:"", ownerID:"", producerID:"",
    distributorID:"",retailerID:"",consumerID:""});
    const [UPC,setUPC]=useState();
    const navigate=useNavigate();
    const trackItem=async(e)=>{
        e.preventDefault();
        console.log("UPC",UPC);
        const res=await fetch(`/trackitem/:${UPC}`,{
            method:'GET',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            credentials:'include',
        });
        const data=await res.json();
        console.log("track item data res",data);
        if(res.status==400){
            console.log("Enter UPC");
            window.alert("Enter UPC");
        }
        else if(res.status==422){
            console.log("Item with this UPC doesn't exist");
            window.alert("Item with this UPC doesn't exist");
        }
        else{
            const {upc, fishName, state, quality, price, originLatitude, originLongitude, ownerID, producerID,
            distributorID,retailerID,consumerID}=data;
            setItem({upc, fishName, state, quality, price, originLatitude, originLongitude, ownerID, producerID,
                distributorID,retailerID,consumerID});
        }
    }
    const callTrack=async()=>{
        try{
            const res= await fetch('/track',{
                method:'GET',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json'
                },
                credentials:'include'
            });
            const data=await res.json();
            console.log("track data=",data);

            if(!res.status===200){
                window.alert("You need to login first");
                const error=new Error(res.error);
                throw error;
            }


        }catch(err){
            console.log("err=",err);
            navigate('/login');
        }
    }
    useEffect(()=>{
        callTrack();
    },[]);
    
    const paperStyle={padding :30,height:'100vh',width:380, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    return (
        <Grid container spacing={1}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><AssessmentIcon/></Avatar>
                    <h2>Track Fish</h2>
                </Grid>
                <TextField label='UPC' placeholder='Enter UPC' name="upc" value={UPC} onChange={(e)=>{setUPC(e.target.value)}}  fullWidth required/>
                
                <p>Fish's name: {item.fishName}</p>
                <p>Fish's state: {item.state}</p>
                <p>Fish's quality: {item.quality}</p>
                <p>Fish's price: {item.price}</p>
                <p>Fish's originLatitude: {item.originLatitude}</p>
                <p>Fish's originLongitude: {item.originLongitude}</p>
                <p>Fish's ownerID: {item.ownerID}</p>
                <p>Fish's producerID: {item.producerID}</p>
                <p>Fish's distributorID: {item.distributorID}</p>
                <p>Fish's retailerID: {item.retailerID}</p>
                <p>Fish's consumerID: {item.consumerID}</p>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={trackItem} fullWidth>Track</Button>
            </Paper>
        </Grid>
    )
}

export default Track
