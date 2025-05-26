
// Components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isSellerLoggedIn, children }) => {
  return isSellerLoggedIn ? children : <Navigate to="/seller-login" />;
};

export default ProtectedRoute;
