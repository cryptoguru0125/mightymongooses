import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import '../Cards.css';
import UserCardItem from '../UserCardItem';

function CentralAuthority() {
    const [users,setUsers]=useState([]);
    const navigate=useNavigate();
    var centralAuthorityData;
    const callCentralAuthority=async()=>{
        try{
            const res= await fetch('/centralauthority',{
                method:'GET',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json'
                },
                credentials:'include'
            });
            centralAuthorityData=await res.json();
            console.log("consumer data=",centralAuthorityData);

            if(!res.status===200){
                const error=new Error(res.error);
                throw error;
            }
            if(centralAuthorityData._id!="61d97bc1789031375b6a6c66"){
                window.alert("You're not central authority");
                navigate('/login');
            }
        }catch(err){
            console.log("central authority err=",err);
            navigate('/login');
        }
    }
    const callUsers=async()=>{
        try{
            const res=await fetch('/callusers',{
                method:'GET',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json'
                },
                credentials:'include'
            })
            const users= await res.json();
            
            if(!res.status===200){
                const error=new Error(res.error);
                throw error;
            }
            else{
                console.log("all users=",users);
                setUsers(users.map(u=>{
                    return{
                        _id:u._id,
                        name:u.name,
                        email:u.email,
                        phone:u.phone,
                        role:u.role
                    }
                }));
            }

        }catch(err){
            console.log("ca err=",err);
        }
    }
    useEffect(()=>{
        callCentralAuthority();
        callUsers();
    },[]);

    return (
        <div className='cards'>
            <h1>Central Authority</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                {users.map((u)=>{
                return(
                    <div className='cards__items'>
                    <UserCardItem
                    _id={u._id}
                    name={u.name}
                    email={u.email}
                    phone={u.phone}
                    role={u.role}
                />
                </div>
                )
                console.log({users});
            })}
                </div>
            </div>      
        </div>
    )
}

export default CentralAuthority
