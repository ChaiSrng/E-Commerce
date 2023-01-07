import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [name,setName]=useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem("userDetails");
        if(auth)
        {navigate("/");}
    })

    const collectData = async() =>{
        console.log(name,email,password)
        let result = await fetch('http://localhost:5000/register',{
            method:'post',
            body:JSON.stringify({name,email,password}),
            headers:{
                'Content-Type' : 'application/json'
            }
        });
        result = await result.json();
        console.log(result);

        //creating local storage
        localStorage.setItem("userDetails",JSON.stringify(result.result));
        localStorage.setItem("token",JSON.stringify(result.auth));
       //navigating to home after signup
        navigate('/');
    }
    return(
        <div className="register">
            <h3>Register for e-comm</h3>
            <input className="inputbox" type="text" 
            value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name"/>

            <input className="inputbox" type="text" 
            value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter Email"/>

            <input className="inputbox" type="password" 
            value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Enter Password"/>

            <button className="appbutton" type="button" onClick={collectData}>Sign Up</button>
        </div>
    )
}

export default SignUp;