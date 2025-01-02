import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="flex flex-col gap-4">
        <Link to="/admin/restaurants" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Manage Restaurants
        </Link>
        <Link to="/admin/reviews" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Manage Reviews
        </Link>
        <Link to="/admin/reservations" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
          Manage Reservations
        </Link>
        </div>
    </div>
  );
};

export default AdminPanel;