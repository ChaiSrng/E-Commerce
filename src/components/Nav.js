import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../mernIcon.jpeg';

const Nav = () =>{
    const auth=localStorage.getItem("userDetails");
    console.log("from nav retriving auth : "+auth);

    //re-redering the Nav component
    const navigate = useNavigate();
    //logout func
    const  logout = () =>{
        localStorage.clear();
        navigate('/signup');
        //console.log("loggi");
    }

    return(
        <div>
            <img className = "logo" alt="logo" src={logo}></img>
            {
                auth ? <ul className='nav-ul'>
                        <li><Link to="/">Products</Link></li>
                        <li><Link to="/add">Add Products</Link></li>
                        <li><Link to="/update">Update Products</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
                    </ul>
                    :
                    <ul className='nav-ul nav-right'>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                    </ul>
            }
        </div>
    )
}

export default Nav;