import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { TeacherDashboard } from './pages/teacher/TeacherDashboard';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { Login } from './pages/Login';
import { useEffect } from 'react';
import { initializeDefaultUsers } from './services/defaultUsers';

function App() {
  useEffect(() => {
    initializeDefaultUsers();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;