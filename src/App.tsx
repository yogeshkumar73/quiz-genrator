import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useUserStore } from './store/useUserStore';
import { useEventStore } from './store/useEventStore';
import { LandingPage } from './panels/LandingPage';
import { UserDashboard } from './panels/user/UserDashboard';
import { AdminDashboard } from './panels/admin/AdminDashboard';

// Tracking Middleware Component
const EventTracker: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const username = useUserStore(state => state.username);
  const addEvent = useEventStore(state => state.addEvent);

  useEffect(() => {
    if (username) {
      addEvent(username, 'VIEW', location.pathname);
    }
  }, [location.pathname, username]);

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated, checkSession } = useUserStore();

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={!isAuthenticated ? <LandingPage /> : <Navigate to="/dashboard" />}
      />

      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <EventTracker>
              <UserDashboard />
            </EventTracker>
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route
        path="/admin"
        element={
          <EventTracker>
            <AdminDashboard />
          </EventTracker>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
