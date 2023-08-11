import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png';
import styles from '../styles/login.module.css';
import {toast} from 'react-toastify';
import { useCookies } from 'react-cookie';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(['accessToken']);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
   try{
        const res = await fetch("/service/userlogin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
          });

      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      }
      else
      {
       
        toast.success("Login Successful!");
        navigate('/service/showservice');
      }

    } catch (err) {

        toast.error("Invalid Credentials");

    }
  };


  return (
<div className="container mx-auto" style={{background: '#dcdce6', backgroundImage: `url(${require('../assets/Background.png')})`}}>
    <div className='flex justify-center items-center h-screen'>
      <div className={styles.glass}>

        <div className="title flex flex-col items-center">
        <h4 className='text-4xl font-bold' style={{ marginTop: '-50px' }}>
        Welcome!
      </h4>
         
        </div>

        <form className='py-1' onSubmit={handleSubmit}>
            <div className='profile flex justify-center py-4'>
                <img src={avatar} className={styles.profile_img} alt="avatar" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
                <input className={styles.textbox} type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
                <input className={styles.textbox} type="text" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                <button className={styles.btn} type='submit'> Login</button>
            </div>

            <div className="text-center py-4">
              <span className='text-gray-500'>Don't have an account? <Link className='text-red-500' to="/register">Sign Up</Link></span>
            </div>

        </form>

      </div>
    </div>
</div>
  );
}

export default Login;