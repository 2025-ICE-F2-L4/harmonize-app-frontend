import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Calendar from '../../pages/Calendar/Calendar';
import Activities from '../../pages/Activities/Activities';
import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />     
          <Route path="/activities" element={<Activities />} /> 
          <Route path='/login' element={Login}/>    
        </Route>
      </Routes>
    </Router>
  );
}

export default App;