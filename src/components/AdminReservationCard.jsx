import React, { useState } from 'react';
import { updateReservation } from '../utils/api';

const AdminReservationCard = ({ reservation }) => {
  const [selectedStatus, setSelectedStatus] = useState(reservation.status);


  const handleStatusChange = async (e) => {
    setSelectedStatus(e.target.value);
    try {
      await updateReservation(reservation._id, { status: e.target.value });
      alert('Reservation updated successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Failed to update reservation:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 my-2">
      <h3 className="text-xl font-semibold mb-2">
        {reservation.restaurant?.name}
      </h3>
      <p className="text-gray-700">
        <strong>User:</strong> {reservation.user?.name}
      </p>
      <p className="text-gray-700">
        <strong>Date:</strong> {new Date(reservation.date).toLocaleDateString()}
      </p>
      <p className="text-gray-700">
        <strong>Time:</strong> {reservation.time}
      </p>
      <p className="text-gray-700">
        <strong>Party Size:</strong> {reservation.partySize}
      </p>
      <div className="mt-4">
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700 dark:text-white"
        >
          Status:
        </label>
        <select
          id="status"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={selectedStatus}
          onChange={handleStatusChange}
        >
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
    </div>
  );
};

export default AdminReservationCard;