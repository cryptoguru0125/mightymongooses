import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link,  FormControl, InputLabel, Select, MenuItem  } from '@material-ui/core';
import LooksOneIcon from '@material-ui/icons/LooksOne';


function Consumer() {
    const [UPC,setUPC]=useState();
    const [STATE,setSTATE]= useState(0);  
    const [QUALITY,setQUALITY]=useState();
    const [ownerID,setOwnerID]=useState();
    const [consumerID,setConsumerID]=useState();
    const navigate=useNavigate();
    var consumerData;
    const callConsumer=async()=>{
        try{
            const res= await fetch('/consumer',{
                method:'GET',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json'
                },
                credentials:'include'
            });
            consumerData=await res.json();
            console.log("consumer data=",consumerData);

            if(!res.status===200){
                const error=new Error(res.error);
                throw error;
            }
            if(consumerData.role!="consumer"&&consumerData._id!="61d97bc1789031375b6a6c66"){
                window.alert("You role is not of a consumer");
                navigate('/login');
            }
            else if(consumerData.allowed==false){
                window.alert("You are not added yet by central authority");
                navigate('/login');
            }

        }catch(err){
            console.log("err=",err);
            navigate('/login');
        }
    }
    useEffect(()=>{
        callConsumer();
    },[]);

    const paperStyle={padding :30,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}

    const handleClick=(num)=>{
        setSTATE(num);
        setConsumerID(consumerData.email);
        setOwnerID(consumerData.email);
    }

    const UpdateStateAndQualityAndConsumer=async(e)=>{
        const obj={UPC,STATE,QUALITY,consumerID,ownerID};
        e.preventDefault();
        console.log("upc,state,quality,consumerID,ownerID=",UPC,STATE,QUALITY,consumerID,ownerID,obj);
        const res= await fetch('/updatestateandqualityandconsumer',{
            method:'PATCH',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(obj)
        });
        const data=await res.json();
        console.log("consumer data",data);
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

    return (
        <Grid container spacing={1}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LooksOneIcon/></Avatar>
                    <h2>Buy Fish</h2>
                </Grid>
                <TextField label='UPC' placeholder='Enter UPC' name="upc" value={UPC} onChange={(e)=>{setUPC(e.target.value);handleClick(8);}} fullWidth required/>
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
                        <MenuItem value="good">Good</MenuItem>
                        <MenuItem value="poor">Poor</MenuItem>
                    </Select>
                    </FormControl>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={(e)=>{UpdateStateAndQualityAndConsumer(e);}} fullWidth>Buy</Button>
            </Paper>
        </Grid>
    )
}

export default Consumer
