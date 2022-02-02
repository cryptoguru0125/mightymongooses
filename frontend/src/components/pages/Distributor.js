import React, {useState,useEffect} from 'react';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';
import {useNavigate} from 'react-router-dom';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';

function Distributor() {
    const [UPC,setUPC]=useState();
    const [STATE,setSTATE]= useState(0);  
    const [QUALITY,setQUALITY]=useState();
    const [ownerID,setOwnerID]=useState();
    const [distributorID,setDistributorID]=useState();
    var distributorData;
    const navigate=useNavigate();
    const callDistributor=async()=>{
        try{
            const res= await fetch('/distributor',{
                method:'GET',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json'
                },
                credentials:'include'
            });
            distributorData=await res.json();
            console.log("call distributor data=",distributorData);

            if(!res.status===200){
                const error=new Error(res.error);
                throw error;
            }
            if(distributorData.role!="distributor" && distributorData._id!="61d97bc1789031375b6a6c66"){
                window.alert("You role is not of a distributor");
                navigate('/login');
            }
            else if(distributorData.allowed==false){
                window.alert("You are not added yet by central authority");
                navigate('/login');
            }

        }catch(err){
            console.log("err=",err);
            navigate('/login');
        }
    }
    useEffect(()=>{
        callDistributor();
    },[]);
    const paperStyle={padding :30,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}

    const handleClick=(num)=>{
        setSTATE(num);
        setDistributorID(distributorData.email);
        setOwnerID(distributorData.email);
    }
    const UpdateStateAndQualityAndDistributor=async(e)=>{
        const obj={UPC,STATE,QUALITY,distributorID,ownerID};
        e.preventDefault();
        console.log("upc,state,quality,distributorID,ownerID=",UPC,STATE,QUALITY,distributorID,ownerID,obj);
        const res= await fetch('/updatestateandqualityanddistributor',{
            method:'PATCH',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(obj)
        });
        const data=await res.json();
        console.log("distributor data",data);
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
                    <h2>Receive Fish</h2>
                </Grid>
                <TextField label='UPC' placeholder='Enter UPC' name="upc" value={UPC} onChange={(e)=>{setUPC(e.target.value);handleClick(4);}} fullWidth required/>
                <FormControl fullWidth required>
                <InputLabel id="demo-simple-select-label">Quality</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={QUALITY}
                        label="quality"
                        name="quality"
                        onChange={(e)=>{setQUALITY(e.target.value);}}
                    >
                        <MenuItem value="Good">Good</MenuItem>
                        <MenuItem value="Poor">Poor</MenuItem>
                    </Select>
                    </FormControl>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={(e)=>{UpdateStateAndQualityAndDistributor(e);}} fullWidth>Receive</Button>
            </Paper>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LooksTwoIcon/></Avatar>
                    <h2>Ship Fish</h2>
                </Grid>
                <TextField label='UPC' placeholder='Enter UPC' name="upc" onChange={(e)=>{setUPC(e.target.value);handleClick(5);}}  fullWidth required/>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={(e)=>{UpdateState(e);}} fullWidth>Ship</Button>
            </Paper>
        </Grid>
    )
}

export default Distributor
