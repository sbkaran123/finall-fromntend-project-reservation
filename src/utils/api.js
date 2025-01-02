import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Authorization Header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle Responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., clear local storage, redirect to login)
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Restaurant API Calls
export const fetchRestaurants = async () => {
  const response = await api.get('/restaurants');
  return response.data;
};

export const fetchRestaurant = async (id) => {
  const response = await api.get(`/restaurants/${id}`);
  return response.data;
};

export const searchRestaurants = async (filters) => {
  const response = await api.get('/restaurants/search', { params: filters });
  return response.data;
};

export const createRestaurant = async (restaurantData) => {
  const response = await api.post('/restaurants', restaurantData);
  return response.data;
};

 export const updateRestaurant = async (id, restaurantData) => {
  const response = await api.put(`/restaurants/${id}`, restaurantData);
  return response.data;
};

export const deleteRestaurant = async (id) => {
  const response = await api.delete(`/restaurants/${id}`);
  return response.data;
};

// Review API Calls
export const createReview = async (reviewData) => {
  const response = await api.post('/reviews', reviewData);
  return response.data;
};

export const updateReview = async (id, reviewData) => {
    const response = await api.put(`/reviews/${id}`, reviewData);
    return response.data;
  };

export const deleteReview = async (id) => {
  const response = await api.delete(`/reviews/${id}`);
  return response.data;
};

export const fetchAllReviews = async () => {
    const response = await api.get('/reviews');
    return response.data;
  };

// User API Calls
export const registerUser = async (userData) => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await api.post('/users/login', { email, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const fetchUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

// Reservation API Calls
export const createReservation = async (reservationData) => {
  const response = await api.post('/reservations', reservationData);
  return response.data;
};

  export const updateReservation = async (id, reservationData) => {
    const response = await api.put(`/reservations/${id}`, reservationData);
    return response.data;
  };

  export const deleteReservation = async (id) => {
    const response = await api.delete(`/reservations/${id}`);
    return response.data;
  };

  export const fetchMyReservations = async () => {
    const response = await api.get(`/reservations/my`);
    return response.data;
  };

  export const fetchAllReservations = async () => {
      const response = await api.get(`/reservations`);
      return response.data;
  };
// Payment API Calls

export const createPaymentIntent = async (amount) => {
    const response = await api.post('/payments/create-payment-intent', {
        amount,
    });
    return response.data;
  };

export default api;