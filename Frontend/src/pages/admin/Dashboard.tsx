import React from 'react';
import { Routes, Route } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500">Manage your restaurant's operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Orders</h2>
          <p className="text-gray-600">View and manage customer orders</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Menu</h2>
          <p className="text-gray-600">Update menu items and categories</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Users</h2>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>
      </div>

      <Routes>
        <Route index element={<div>Select a section to manage</div>} />
        {/* Add more admin routes as needed */}
      </Routes>
    </div>
  );
}

export default AdminDashboard;