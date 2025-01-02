import React, { useState, useEffect } from 'react';
import RestaurantCard from '../components/RestaurantCard';
import SearchBar from '../components/SearchBar';
import { fetchRestaurants, searchRestaurants } from '../utils/api';
import Loading from '../components/Loading';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const data = await fetchRestaurants();
        setRestaurants(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load restaurants:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    loadRestaurants();
  }, []);

  const handleSearch = async (filters) => {
    setLoading(true);
    try {
      const data = await searchRestaurants(filters);
      setRestaurants(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Restaurants</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Restaurants;