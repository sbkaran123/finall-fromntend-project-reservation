import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-2">{restaurant.name}</h2>
      <p className="text-gray-700 mb-2">{restaurant.cuisine}</p>
      <p className="text-gray-600 mb-3">{restaurant.address}</p>
      <p className="text-gray-600 mb-3">{restaurant.priceRange}</p>
      <Link to={`/restaurants/${restaurant._id}`} className="text-blue-500">
        View Details
      </Link>
    </div>
  );
};

export default RestaurantCard;