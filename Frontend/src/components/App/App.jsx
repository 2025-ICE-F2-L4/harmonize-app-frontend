import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Calendar from '../../pages/Calendar/Calendar';
import Activities from '../../pages/Activities/Activities';
import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

function App() {
  return (
 
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route path="/" element={<Login />} />
      </Route>

      <Route path="/" element={<Layout />}>
        <Route path="home" element={<Home />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="activities" element={<Activities />} />
      </Route> 
    </Routes>
  );
}

export default App;
