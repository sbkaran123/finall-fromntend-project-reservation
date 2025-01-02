// import React from 'react';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 text-white text-center p-4 mt-8">
//       <div className="container mx-auto">
//         <p>© {new Date().getFullYear()} Restaurant Platform</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// import React from 'react';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 text-white text-center p-4">
//       <div className="container mx-auto">
//         <p>© {new Date().getFullYear()} Restaurant Platform</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from "react";
import "../styles/footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Contact Us</h4>
            <ul>
              <li>Email: example@example.com</li>
              <li>Phone: (123) 456-7890</li>
              <li>Address: 123 Street, City, Country</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <ul className="social-links">
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>About</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula erat eu ligula gravida, et tincidunt velit volutpat.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 YourCompany. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

