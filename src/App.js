import './App.css';
import * as React from 'react';
import Navbar from './components/Navbar';
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
        </Routes>
    </div>
  );
}

export default App;
