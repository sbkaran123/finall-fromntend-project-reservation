/* import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App; */


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import RestaurantView from './pages/RestaurantView';
import Reservations from './pages/Reservations';
import Profile from './pages/Profile';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminRestaurants from './pages/Admin/AdminRestaurants';
import AdminReviews from './pages/Admin/AdminReviews';
import AdminReservations from './pages/Admin/AdminReservations';
import { AuthProvider } from './context/AuthContext';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Header from './components/Header';
import Footer from './components/Footer';

const stripePromise = loadStripe('pk_test_51O6otaSFsGF8VKTo9hoRsp76Vaou0rHoI8XlZSH2JnvgsosLfRPkEiWpTeEiflQggLhNeacOYkQ2ixUEZuYR5EsS00zzJOXuEq');

function App() {
  return (
    <AuthProvider>
      
        <Elements stripe={stripePromise}>
        <Router>

        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurants/:id" element={<RestaurantView />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/restaurants" element={<AdminRestaurants />} />
            <Route path="/admin/reviews" element={<AdminReviews />} />
             <Route path="/admin/reservations" element={<AdminReservations />} />
          </Routes>
          <Footer />
        </Router>
    </Elements>
  </AuthProvider>
  );
}

export default App;
