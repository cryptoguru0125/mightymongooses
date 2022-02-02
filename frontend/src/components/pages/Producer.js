import React,{useEffect, useState,useRef} from 'react';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core';
import {useNavigate} from 'react-router-dom';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';
import Looks4Icon from '@material-ui/icons/Looks4';

function Producer() {
    const navigate=useNavigate();
    const [item, setItem]=useState({upc:"", fishName:"", state:"0", quality:"good", originLatitude:" ", originLongitude:" ", ownerID:" ", producerID:" ",
    distributorID:" ",retailerID:" ",consumerID:" "
});
    const [UPC,setUPC]=useState();
    const [STATE,setSTATE]= useState(item.state);   
    let name,value;
    const handleInputs=(e)=>{
        console.log(e);
        name=e.target.name;
        value=e.target.value;

        setItem({...item,[name]:value});
        console.log("item=",item);
    }

    const PostData=async(e)=>{
        e.preventDefault();
        const {upc, fishName, state, quality, price, originLatitude, originLongitude, ownerID, producerID,
        distributorID,retailerID,consumerID} = item;
        const res=await fetch('/fishOut',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                upc, fishName, state, quality, price, originLatitude, originLongitude, ownerID, producerID,
                distributorID,retailerID,consumerID
            })
        })
        const data=await res.json();
        if(res.status===422 || !data){
            window.alert("Can't fish out");
            console.log("Can't fish out");
        }
        else if(res.status==421){
            window.alert("Enter new UPC");
            console.log("Enter new UPC");
        }
        else{
            window.alert("Fished Out");
            console.log("Fished Out");
        }
    }

    const handleClick=(num)=>{
        setSTATE(num);
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

    const callProducer=async()=>{
        try{
            const res= await fetch('/producer',{
                method:'GET',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json'
                },
                credentials:'include'
            });
            const data=await res.json();
            console.log("producer data=",data);

            if(!res.status===200){
                const error=new Error(res.error);
                throw error;
            }
            if(data.role!="producer"){
                window.alert("You role is not of a producer");
                navigate('/login');
            }
            else if(data.allowed==false){
                window.alert("You are not added yet by central authority");
                navigate('/login');
            }
            setItem({...item,"producerID":data.email,"ownerID":data.email});

        }catch(err){
            console.log("err=",err);
            navigate('/login');
        }
    }
    useEffect(()=>{
        callProducer();  
    },[]);
    // const didMountRef=useRef(false);
    // useEffect(()=>{
    //     if(didMountRef.current){
    //         return UpdateState;
    //     }
    //     didMountRef.current=true;
    // },[STATE]);
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    return (
        <Grid container spacing={1}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LooksOneIcon/></Avatar>
                    <h2>Find Fish</h2>
                </Grid>
                <TextField label='UPC' placeholder='Enter UPC' name="upc" value={item.upc} onChange={handleInputs}  fullWidth required/>
                <TextField label='Fish Name' placeholder='Enter Fish Name' name="fishName" value={item.fishName} onChange={handleInputs} fullWidth required/>
                <TextField label='Latitude' placeholder="Enter pond's Latitude" name="originLatitude" value={item.originLatitude} onChange={handleInputs}fullWidth required/>
                <TextField label='Longitude' placeholder="Enter pond's Longitude" name="originLongitude" value={item.originLongitude} onChange={handleInputs} fullWidth required/>
                <TextField label='Price' placeholder="Enter price" name="price" value={item.price} onChange={handleInputs}fullWidth required/>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={PostData}>Fish Out</Button>
            </Paper>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LooksTwoIcon/></Avatar>
                    <h2>Process Fish</h2>
                </Grid>
                <TextField label='UPC' placeholder='Enter UPC' name="upc" value={UPC} onChange={(e)=>{setUPC(e.target.value);handleClick(1);}} fullWidth required/>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={(e)=>{UpdateState(e);}}>Process</Button>
            </Paper>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><Looks3Icon/></Avatar>
                    <h2>Pack Fish</h2>
                </Grid>
                <TextField label='UPC' placeholder='Enter UPC' name="upc" value={UPC} onChange={(e)=>{setUPC(e.target.value);handleClick(2);}} fullWidth required/>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={(e)=>{UpdateState(e);}}>Pack</Button>
            </Paper>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><Looks4Icon/></Avatar>
                    <h2>Deliver Fish</h2>
                </Grid>
                <TextField label='UPC' placeholder='Enter UPC' name="upc" value={UPC} onChange={(e)=>{setUPC(e.target.value);handleClick(3);}} fullWidth required/>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={(e)=>{UpdateState(e);}}>Deliver</Button>
            </Paper>
        </Grid>
    )
}

export default Producer
