import React from 'react';
import AdminPanel from '../../components/AdminPanel';
import ProtectedRoute from '../../components/ProtectedRoute';

const AdminDashboard = () => {
  return (
    <ProtectedRoute isAdmin={true}>
      <AdminPanel />
    </ProtectedRoute>
  );
};

export default AdminDashboard;