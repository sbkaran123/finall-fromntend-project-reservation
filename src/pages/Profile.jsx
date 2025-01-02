import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchUserProfile } from '../utils/api';
import Loading from '../components/Loading';
import Payment from '../components/Payment';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const data = await fetchUserProfile();
        setUserProfile(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load user profile:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    loadUserProfile();
  }, [user]);
  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {user ? 'My Profile' : 'User Profile'}
      </h1>
      {user ? (
        <div>
          {userProfile && (
            <>
              <p className="text-gray-700 mb-2">
                <strong>Name:</strong> {userProfile.name}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> {userProfile.email}
              </p>
            </>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Logout
          </button>
          <Payment />
        </div>
      ) : (
        <p className="text-gray-700">Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;