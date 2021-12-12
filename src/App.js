import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage/Home/Home';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
