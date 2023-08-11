import React, { useState } from 'react';
import axios from 'axios';
import DisplayForm from '../DisplayForm/DisplayForm';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';

import {useNavigate} from 'react-router-dom';

const LoginForm = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);


  const handleLogin = async () => {
    try {
      const response =await axios({
        method: 'post',
        url: '/service/adminlogin',
        data: {
          username: username,
          password: password,
          
        }
      });
      const { token } = response.data;
      localStorage.setItem('token', token); // Store the token in local storage

      // Set logged in state and clear form
      setLoggedIn(true);
      setUsername('');
      setPassword('');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Invalid credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    setLoggedIn(false);
  };

  if (loggedIn) {
    navigate('/displayform');
  }

  return (
    <div>
    <br/><br/><br/>
    <MDBContainer fluid>
  <MDBRow className='d-flex justify-content-center align-items-center h-100'>
    <MDBCol col='12'>
      <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
        <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
          <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
          <p className="text-white-50 mb-5">Please enter your login and password!</p>
          <form onSubmit={e => e.preventDefault()}>
            <MDBInput wrapperClass='mb-4 w-100' labelClass='text-white' label='Email address' id='formControlLg' type='text' value={username} onChange={e => setUsername(e.target.value)} size="lg" />
            <MDBInput wrapperClass='mb-4 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' value={password} onChange={e => setPassword(e.target.value)} size="lg" />
            <MDBBtn onClick={handleLogin} outline className='mx-2 px-5' color='white' size='lg'>
              Login
            </MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  </MDBRow>
</MDBContainer>
</div>

  );
}

export default LoginForm;