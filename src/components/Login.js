import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Login=()=>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem("userDetails");
        if(auth)
        {navigate("/");}
    })

    const Login = async() => {
        console.log(email,password);
        console.log(JSON.stringify({email,password}));
        let result = await fetch('http://localhost:5000/login',{
            method : 'post',
            body : JSON.stringify({email,password}),
            headers : {
                'Content-Type' : 'application/json'
            }
        });

        //since result is a promise we are converting it to json
        result = await result.json();
        console.log("result is : " + result);

        if(result.result){
            localStorage.setItem("userDetails",JSON.stringify(result.result));
            localStorage.setItem("token",JSON.stringify(result.auth));
            console.log("token is : "+result.auth);
            navigate('/');
        }else{
            const message = result;
            alert(message.result);
        }
        
    }

    return(
        <div className='login'>
            <input className = "inputbox" type="text" placeholder = "Enter Email" onChange={(e)=>setEmail(e.target.value)} value={email}></input>
            <input type="password" className = 'inputbox' placeholder = "Enter Password" onChange={(e)=>setPassword(e.target.value)} value={password}></input>
            <button onClick={Login} className='appbutton' type="button">Login</button>
        </div>
    )
}

export default Login;