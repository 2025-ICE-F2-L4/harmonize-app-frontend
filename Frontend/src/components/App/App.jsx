import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Calendar from '../../pages/Calendar/Calendar';
import Activities from '../../pages/Activities/Activities';
import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import FamilyManagement from '../../pages/FamilyManagement/FamilyManagement';

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

function App() {
  return (
 
    // not logged in routes
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route path="/" element={<Login />} />
      </Route>

      {/* logged in routes */}
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<Home />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="activities" element={<Activities />} />
        <Route path="family" element = {<FamilyManagement/>}/>
      </Route> 
    </Routes>
  );
}

export default App;
