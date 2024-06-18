import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import EmployeList from './components/Employes/EmployeList';
import EmployeForm from './components/Employes/EmployeForm';
import PostesList from './components/Postes/PostesList';
import AddPoste from './components/Postes/PostesForm';
import AddShift from './components/Shifts/ShiftForm';
import ShiftsList from './components/Shifts/ShiftList';
import AdminLogin from './components/AdminLogin/AdminLogin';
import AdminList from './components/Admin/AdminList';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
function App() {
  const [, setLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<AdminLogin setLoggedIn={setLoggedIn} />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/employees" element={<EmployeList />} />
        <Route path="/employeesAjout" element={<EmployeForm />} />
        <Route path="/postes" element={<PostesList />} />
        <Route path="/postesAjout" element={<AddPoste />} />
        <Route path="/shifts" element={<ShiftsList />} />
        <Route path="/shiftsAjout" element={<AddShift />} />
        <Route path="/admin" element={<AdminList />} />
      </Routes>
    </Router>
  );
}

export default App;
