import React from 'react';
import { deleteRestaurant } from '../utils/api';
import { useState } from 'react';
import EditRestaurantModal from './EditRestaurantModal';

const AdminRestaurantCard = ({ restaurant }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteRestaurant(restaurant._id);
      alert('Restaurant deleted successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Failed to delete restaurant:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 my-2">
      <h2 className="text-xl font-bold mb-2">{restaurant.name}</h2>
      <p className="text-gray-700 mb-2">{restaurant.cuisine}</p>
      <p className="text-gray-600 mb-3">{restaurant.address}</p>
      <p className="text-gray-600 mb-3">{restaurant.priceRange}</p>
      <div className="flex justify-end">
        <button
          onClick={() => setShowEditModal(true)}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
        >
          Delete
        </button>
      </div>
      {showEditModal && (
        <EditRestaurantModal
          restaurant={restaurant}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default AdminRestaurantCard;