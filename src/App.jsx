// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserProfile from './assets/FE-1.2.1/UserProfile';
import ExamTable from './assets/FE-2.1.1/ExamTable';
import ResultSummary from './assets/FE-3.2.3/ResultSummary';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserProfile />} />
        <Route path="/a" element={<ExamTable />} />
        <Route path="/b" element={<ResultSummary/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
