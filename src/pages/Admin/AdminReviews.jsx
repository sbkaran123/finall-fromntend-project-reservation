import React, { useState, useEffect } from 'react';
import { fetchAllReviews } from '../../utils/api';
import ReviewCard from '../../components/ReviewCard';
import Loading from '../../components/Loading';
import ProtectedRoute from '../../components/ProtectedRoute';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchAllReviews();
        setReviews(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load reviews:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    loadReviews();
  }, []);
  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <ProtectedRoute isAdmin={true}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Manage Reviews</h1>
        <div className="grid gap-4">
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminReviews;