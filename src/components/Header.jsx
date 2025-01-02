// import React from 'react';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Header = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//       logout();
//       navigate('/login');
//   };

//   return (
//     <header className="bg-gray-800 text-white p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link to="/" className="text-xl font-bold">
//           Restaurant Platform
//         </Link>
//         <nav>
//           <ul className="flex gap-4 items-center">
//             <li>
//               <NavLink
//                 to="/restaurants"
//                 className={({ isActive }) =>
//                   `hover:text-gray-300 ${isActive ? 'text-gray-300' : ''}`
//                 }
//               >
//                 Restaurants
//               </NavLink>
//             </li>
//             {user ? (
//               <>
//                   <li>
//                     <NavLink
//                       to="/reservations"
//                       className={({ isActive }) =>
//                         `hover:text-gray-300 ${isActive ? 'text-gray-300' : ''}`
//                       }
//                     >
//                       Reservations
//                     </NavLink>
//                   </li>
//                   <li>
//                       <NavLink
//                         to="/profile"
//                         className={({ isActive }) =>
//                           `hover:text-gray-300 ${isActive ? 'text-gray-300' : ''}`
//                         }
//                       >
//                        {user.name}
//                       </NavLink>
//                   </li>
//                 {user.isAdmin ? (
//                     <li>
//                         <NavLink
//                         to="/admin"
//                         className={({ isActive }) =>
//                           `hover:text-gray-300 ${isActive ? 'text-gray-300' : ''}`
//                         }
//                       >
//                         Admin
//                       </NavLink>
//                     </li>
//                 ) : null}
//                 <li>
//                   <button
//                     onClick={handleLogout}
//                     className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li>
//                   <NavLink
//                     to="/login"
//                     className={({ isActive }) =>
//                       `hover:text-gray-300 ${isActive ? 'text-gray-300' : ''}`
//                     }
//                   >
//                     Login
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/signup"
//                     className={({ isActive }) =>
//                       `hover:text-gray-300 ${isActive ? 'text-gray-300' : ''}`
//                     }
//                   >
//                     Sign Up
//                   </NavLink>
//                 </li>
//               </>
//             )}
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:text-gray-200 transition-colors duration-200">
          Restaurant Platform
        </Link>
        <nav className="hidden md:block"> {/* Hide on small screens, display on medium and up */}
          <ul className="flex gap-6 items-center">
            <li>
              <NavLink
                to="/restaurants"
                className={({ isActive }) =>
                  `hover:text-gray-300 transition-colors duration-200 ${isActive ? 'text-gray-300' : ''}`
                }
              >
                Restaurants
              </NavLink>
            </li>
            {user ? (
              <>
                <li>
                  <NavLink
                    to="/reservations"
                    className={({ isActive }) =>
                      `hover:text-gray-300 transition-colors duration-200 ${isActive ? 'text-gray-300' : ''}`
                    }
                  >
                    Reservations
                  </NavLink>
                </li>
                 <li>
                    <NavLink
                      to="/profile"
                      className={({ isActive }) =>
                        `hover:text-gray-300 transition-colors duration-200 ${isActive ? 'text-gray-300' : ''}`
                      }
                    >
                      {user.name}
                    </NavLink>
                  </li>
                {user.isAdmin ? (
                  <li>
                    <NavLink
                      to="/admin"
                      className={({ isActive }) =>
                        `hover:text-gray-300 transition-colors duration-200 ${isActive ? 'text-gray-300' : ''}`
                      }
                    >
                      Admin
                    </NavLink>
                  </li>
                ) : null}
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `hover:text-gray-300 transition-colors duration-200 ${isActive ? 'text-gray-300' : ''}`
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      `hover:text-gray-300 transition-colors duration-200 ${isActive ? 'text-gray-300' : ''}`
                    }
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
          {/* Hamburger menu for mobile */}
          <div className="md:hidden">
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

            </button>
          </div>
      </div>
    </header>
  );
};

export default Header;