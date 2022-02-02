import React from 'react'
import {Button, Paper, ButtonGroup} from '@material-ui/core';

function UserCardItem(props) {
    const btnstyle={width: 80}
    const paperStyle={padding :30,height:'50vh',width:280, margin:"20px auto"}
    console.log("props=",props);
    const addUser=async()=>{
        console.log("props.id",props._id);
            const obj={_id:props._id};
            const res=await fetch('/adduser',{
                method:'PATCH',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(obj)
            })
            const data=await res.json();
        console.log("user data",data);
        if(res.status===422 || !data){
            window.alert("Something went wrong while adding user");
            console.log("Something went wrong while adding user");
            //window.location.reload();
            
        }
        else{
            window.alert("User added successfully");
            console.log("User added successfully");
            //window.location.reload();
        }

    }
    const removeUser=async()=>{
        console.log("props.id",props._id);
            const obj={_id:props._id};
            const res=await fetch('/removeuser',{
                method:'PATCH',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(obj)
            })
            const data=await res.json();
        console.log("user data",data);
        if(res.status===422 || !data){
            window.alert("Something went wrong while removing user");
            console.log("Something went wrong while removing user");
            //window.location.reload();
            
        }
        else{
            window.alert("User removed successfully");
            console.log("User removed successfully");
            //window.location.reload();
        }
    }
    return (
        <>
        <Paper elevation={10} style={paperStyle}>
        <li className='cards__item'>
          <div className='cards__item__info'>
            <p>Name: {props.name}</p>
            <p>Email: {props.email}</p>
            <p>Phone: {props.phone}</p>
            <p>Role: {props.role}</p>
            <ButtonGroup display="flex" justifyContent="space-between">
            <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={addUser}>Add</Button>
            <Button type='submit' color='secondary' variant="contained" style={btnstyle} fullWidth onClick={removeUser}>Remove</Button>
            </ButtonGroup>
          </div>
      </li>
      </Paper>
        </>
    )
}

export default UserCardItem;
