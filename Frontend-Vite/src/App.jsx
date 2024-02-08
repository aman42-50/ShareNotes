import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import TextEditor from './pages/TextEditor';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route Component={HomePage} path="/" exact/>
        <Route Component={TextEditor} path="/:noteID" />
      </Routes>
    </Router>
  )

};

export default App;
