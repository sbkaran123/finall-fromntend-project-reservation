// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { createPaymentIntent } from '../utils/api';
// import { loadStripe } from '@stripe/stripe-js';
// import {
//   PaymentElement,
//   useStripe,
//   useElements,
// } from '@stripe/react-stripe-js';

// const stripePromise = loadStripe('pk_test_51O6otaSFsGF8VKTo9hoRsp76Vaou0rHoI8XlZSH2JnvgsosLfRPkEiWpTeEiflQggLhNeacOYkQ2ixUEZuYR5EsS00zzJOXuEq');

// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const { user } = useAuth();
//   const [clientSecret, setClientSecret] = useState('');
//   const [amount, setAmount] = useState(10);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     const fetchClientSecret = async () => {
//       if (!user) {
//         alert('Please log in to make a payment');
//         return;
//       }
//       try {
//         const data = await createPaymentIntent(amount);
//         setClientSecret(data.clientSecret);
//       } catch (err) {
//         console.error('Error creating payment intent:', err);
//         setError(err.message);
//       }
//     };

//     fetchClientSecret();
//   }, [user, amount]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!stripe || !elements) {
//       return;
//     }

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: `${window.location.origin}/profile`,
//       },
//     });
//     if (error) {
//       setError(error.message);
//     } else {
//       setSuccess(true);
//     }
//   };

//   const handleAmountChange = (e) => {
//     setAmount(parseInt(e.target.value, 10));
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
//       <div className="mb-4">
//         <label
//           htmlFor="amount"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Amount:
//         </label>
//         <input
//           type="number"
//           id="amount"
//           value={amount}
//           onChange={handleAmountChange}
//           className="mt-1 p-2 border rounded w-full"
//         />
//       </div>
//       {clientSecret && (
//         <PaymentElement id="payment-element" options={{ clientSecret }} />
//       )}
//       {error && <div className="text-red-500 mb-4">{error}</div>}
//       {success && <div className="text-green-500 mb-4">Payment successful!</div>}
//       <button
//         type="submit"
//         disabled={!stripe}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
//       >
//         Pay
//       </button>
//     </form>
//   );
// };

// const Payment = () => {
//   return (
//     <>
//       {stripePromise && (
//         <div className="container mx-auto p-4">
//           <h1 className="text-2xl font-bold mb-4">Make a Payment</h1>
//           <PaymentForm />
//         </div>
//       )}
//     </>
//   );
// };

// export default Payment;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { createPaymentIntent } from '../utils/api';
import { loadStripe } from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51Qc0kxQNb3jYwdsHNqtl6IKnshublovRLrmrRmpLkfZvPw9I9j6G8Vml3l38jpUSgRAcMAgFAFQ3FcxqihCq2V5b00PSYHyzKI');

// Payment Form Component
const PaymentForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/profile`,
      },
    });
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      {clientSecret && <PaymentElement />}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">Payment successful!</div>}
      <button
        type="submit"
        disabled={!stripe}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        Pay
      </button>
    </form>
  );
};

// Payment Component
const Payment = () => {
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState('');
  const [amount, setAmount] = useState(10);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  // Fetch Client Secret
  useEffect(() => {
    const fetchClientSecret = async () => {
      if (!user) {
        alert('Please log in to make a payment');
        setLoading(false);
        return;
      }
      try {
        const data = await createPaymentIntent(amount);
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error('Error creating payment intent:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClientSecret();
  }, [user, amount]);

  const handleAmountChange = (e) => {
    setAmount(parseInt(e.target.value, 10));
  };

  // Show loading until clientSecret is ready
  if (loading) return <div>Loading payment form...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Make a Payment</h1>
      <div className="mb-4">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount:
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>

      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
