import Login from './security/login';
import ClientDashboard from './Client/ClientDashBoard';
import AdminDashboard from './Admin/AdminDashBoard';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const user = JSON.parse(localStorage.getItem('rs_user') || 'null');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/client" element={user ? <ClientDashboard /> : <Navigate to="/login" />} />
        <Route path="/admin" element={user ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;