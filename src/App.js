import './App.css';
import * as React from 'react';
import Navbar from './components/Navbar';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import Home from './containers/Home';
import Detail from './components/Detail';
import Category from './components/Category';

function App() {  
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/category" element={<Category />} />
            {/* <Route path="private" element={
              <ProtectedRoute>
                <div>ini rahasia</div>
              </ProtectedRoute>} />
              <Route path="login" element={
                <ProtectedRoute loginOnly={false}>
                  <Login />
                </ProtectedRoute>} />
              <Route path="register" element={
                <ProtectedRoute loginOnly={false}>
                  <Register />
                </ProtectedRoute>} />
              <Route path="*" element={<NoMatch />} /> */}
        </Routes>
    </div>
  );
}

export default App;
