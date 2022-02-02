import React,{useState} from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core';
import {useNavigate} from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
const Login=()=>{
    const navigate=useNavigate();
    const [user, setUser]=useState({email:"", password:""});
    let name,value;
    const handleInputs=(e)=>{
        console.log(e);
        name=e.target.name;
        value=e.target.value;

        setUser({...user,[name]:value});
    }

    const loginUser=async (e)=>{
        e.preventDefault();
        const {email, password}=user;
        const res=await fetch('/signin',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email,password
            })
        })
        const data=await res.json();
        console.log("data",data);
        if(res.status===400 || !data){
            window.alert("Invalid username or password");
            console.log("Invalid username or password");
        }
        else{
            window.alert("Login Successful");
            console.log("Login Successful");
            navigate('/');
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
                    <h2>Log In</h2>
                </Grid>
                <TextField label='Email' placeholder='Enter email'  name="email" value={user.email} onChange={handleInputs}  fullWidth required/>
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
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={loginUser}>Log in</Button>
                <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Create an account ?
                     <Link href="/signup" >
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login