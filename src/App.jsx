import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Challenges from './pages/Challenges';
import Interviews from './pages/Interviews';
import Test from './pages/Test';
import Curriculum from './pages/Curriculum';
import Resume from './pages/Resume';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Notifications from './pages/Notifications';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/notifications" element={<Notifications />} />

          {/* Layout + Dashboard are public; other routes inside Layout are protected individually */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="challenges" element={<ProtectedRoute><Challenges /></ProtectedRoute>} />
            <Route path="interviews" element={<ProtectedRoute><Interviews /></ProtectedRoute>} />
            <Route path="test" element={<ProtectedRoute><Test /></ProtectedRoute>} />
            <Route path="curriculum" element={<ProtectedRoute><Curriculum /></ProtectedRoute>} />
            <Route path="resume" element={<ProtectedRoute><Resume /></ProtectedRoute>} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;