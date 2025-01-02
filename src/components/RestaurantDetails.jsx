import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRestaurant } from '../utils/api';
import Loading from './Loading';
//import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    const loadRestaurant = async () => {
      try {
        const data = await fetchRestaurant(id);
        setRestaurant(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load restaurant:', error);
        setLoading(false);
      }
    };
    loadRestaurant();
  }, [id]);

  if (loading) return <Loading />;
  if (!restaurant) return <div>Restaurant not found.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{restaurant.name}</h1>
      <p className="mb-2">
        <strong>Cuisine:</strong> {restaurant.cuisine}
      </p>
      <p className="mb-2">
        <strong>Address:</strong> {restaurant.address}
      </p>
      <p className="mb-2">
        <strong>Price Range:</strong> {restaurant.priceRange}
      </p>
      <p className="mb-2">
        <strong>Description:</strong> {restaurant.description}
      </p>
      <p className="mb-2">
        <strong>Menu:</strong> {restaurant.menu}
      </p>
      <p className="mb-2">
        <strong>Opening Hours:</strong> {restaurant.openingHours}
      </p>
      <p className="mb-2">
        <strong>Contact Number:</strong> {restaurant.contactNumber}
      </p>
      {/* Display images as carousel/grid if present */}
      {restaurant.images && (
        <div className="flex flex-wrap justify-around my-4">
          {restaurant.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Restaurant ${index + 1}`}
              className="w-48 h-48 object-cover rounded-md m-2"
            />
          ))}
        </div>
      )}

      {/* Reviews Section */}
      <div className="my-8">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        {/* <ReviewList restaurantId={id} /> */}

        <button
          onClick={() => setShowReviewForm(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Add Review
        </button>
      </div>
      {showReviewForm && (
        <ReviewForm
          restaurantId={id}
          onClose={() => setShowReviewForm(false)}
        />
      )}
    </div>
  );
};

export default RestaurantDetails;