import React from 'react';
import ReactDOM from 'react-dom/client';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import ServiceCreation from './ServiceCreation/ServiceCreation.js';
import ServiceProfile from './ServiceProfile/ServiceProfile.js';
import ServiceUpdation from './ServiceUpdation/ServiceUpdation.js';
import UserNavbar from './UserNavbar/UserNavbar.js';
import Footer from './Footer/Footer.js';
import ShowService from './ShowService/ShowService.js';
import Login from './Login/login.js';
import ServiceDecider from './ServiceDecider/ServiceDecider';
import HiredService from './HiredService/HiredService';
import RequestedService from './RequestedService/RequestedService';
import Pay from './pay/Pay';
import LandingPage from './LandingPage/LandingPage';
import MainNavbar from './UserNavbar/MainNavbar';
import Register from './Register/Register';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>

    

    <Routes>

      <Route path="/" element={<div><MainNavbar/><LandingPage /></div>} />

      <Route path="/userlogin" element={<div><MainNavbar/><Login /></div>} />

      <Route path="/register" element={<div><MainNavbar/><Register /></div>} />

      <Route path="/service/myservice" element={<div><UserNavbar /><ServiceDecider /></div>} />

      <Route path="/service/createservice" element={<div><UserNavbar /><ServiceCreation /></div>} />

      <Route path="/service/serviceprofile" element={<div><UserNavbar /><ServiceProfile /></div>} />

      <Route path="/service/hiredservice" element={<div><UserNavbar /><HiredService /></div>} />

      <Route path="/service/requestedservice" element={<div><UserNavbar /><RequestedService /></div>} />

      <Route path="/service/serviceprofileupdation" element={<div><UserNavbar /><ServiceUpdation /></div>} />

      <Route path="/service/showservice" element={<div><UserNavbar /><ShowService /></div>} />

      <Route path="/pay/:id" element={<div><UserNavbar /><Pay /></div>} />



    </Routes>

    <Footer />

    <ToastContainer />

  </BrowserRouter>

);


