// import React from 'react';

// const ReviewCard = ({ review }) => {
//   const { user, rating, comment } = review;
//   const stars = Array.from({ length: rating }, (_, index) => (
//     <span key={index} className="text-yellow-500">
//       ★
//     </span>
//   ));

//   return (
//     <div className="bg-gray-100 p-4 rounded-md my-2 shadow">
//       <div className="flex items-center mb-2">
//         <span className="font-semibold">{user?.name}</span>
//       </div>
//       <div className="flex items-center mb-2">{stars}</div>
//       <p className="text-gray-700">{comment}</p>
//       {review.images &&
//         review.images.length > 0 && (
//           <div className="flex flex-wrap mt-2">
//             {review.images.map((image, index) => (
//               <img
//                 key={index}
//                 src={image}
//                 alt={`Review Image ${index + 1}`}
//                 className="w-24 h-24 object-cover rounded-md mr-2 mt-1"
//               />
//             ))}
//           </div>
//         )}
//     </div>
//   );
// };

// export default ReviewCard;

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import EditReviewForm from './EditReviewForm';
import { deleteReview } from '../utils/api';

const ReviewCard = ({ review }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const stars = Array.from({ length: review.rating }, (_, index) => (
    <span key={index} className="text-yellow-500">
      ★
    </span>
  ));

  const handleDelete = async () => {
    try {
      await deleteReview(review._id);
      alert('Review deleted successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Failed to delete review:', error);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md my-2 shadow">
      <div className="flex items-center mb-2">
        <span className="font-semibold">{review.user?.name}</span>
      </div>
      <div className="flex items-center mb-2">{stars}</div>
      <p className="text-gray-700">{review.comment}</p>
      {review.images &&
        review.images.length > 0 && (
          <div className="flex flex-wrap mt-2">
            {review.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Review Image ${index + 1}`}
                className="w-24 h-24 object-cover rounded-md mr-2 mt-1"
              />
            ))}
          </div>
        )}

      {user && user._id === review.user?._id && (
        <div className="flex justify-end mt-2">
          <button
            onClick={() => setIsEditing(true)}
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
      )}

      {isEditing && (
        <EditReviewForm
          review={review}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default ReviewCard;