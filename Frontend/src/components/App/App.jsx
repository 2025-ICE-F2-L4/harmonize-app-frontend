import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Calendar from '../../pages/Calendar/Calendar';
import Activities from '../../pages/Activities/Activities';
import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';

function App() {
  return (
    <Routes>
      // add condition to check if user is logged in
      // if not, redirect to login page
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
