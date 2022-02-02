import React, {useState} from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core'
import {useNavigate} from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
const Signup=(props)=>{
    const navigate=useNavigate();
    const [user, setUser]=useState({name:"", email:"", phone:"", role:"", password:"", allowed:false});
    let name,value;
    const handleInputs=(e)=>{
        console.log(e);
        name=e.target.name;
        value=e.target.value;

        setUser({...user,[name]:value});
    }

    const PostData=async(e)=>{
        e.preventDefault();
        const {name, email, phone, role, password,allowed}=user;
        const res=await fetch('/register',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name, email, phone, role, password,allowed
            })
        })
        const data=await res.json();
        if(res.status===422 || !data){
            window.alert("Invalid registration");
            console.log("Invalid registration");
        }
        else{
            window.alert("Registration Successful");
            console.log("Registration Successful");
            navigate('/login');
        }
    }

    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    return(
        <Grid method="POST">
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign Up</h2>
                </Grid>
                <TextField label='Username' placeholder='Enter username' name="name" value={user.name} onChange={handleInputs}  fullWidth required/>
                <TextField label='Email' placeholder='Enter email' name="email" value={user.email} onChange={handleInputs}  fullWidth required/>
                <TextField label='Phone no.' placeholder='Enter phone number' name="phone" value={user.phone} onChange={handleInputs} fullWidth required/>
                <FormControl fullWidth required>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={user.role}
                        label="role"
                        name="role"
                        onChange={handleInputs}
                    >
                        <MenuItem value="producer">Producer</MenuItem>
                        <MenuItem value="distributor">Distributor</MenuItem>
                        <MenuItem value="retailer">Retailer</MenuItem>
                        <MenuItem value="consumer">Consumer</MenuItem>
                    </Select>
                    </FormControl>
                <TextField label='Password' placeholder='Enter password' type='password' name="password" value={user.password} onChange={handleInputs} fullWidth required/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={PostData}>Sign Up</Button>
                <Typography > Do you have an account ?
                     <Link href="/login" >
                        Login
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Signup