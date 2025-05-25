import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { isTokenExpired } from '../utils/auth';

const TokenExpiryHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenExpired(token)) {
      localStorage.removeItem("token");

      Swal.fire({
        icon: 'warning',
        title: 'Session Expired',
        text: 'Please log in again to continue.',
        confirmButtonText: 'Login'
      }).then(() => {
        navigate('/');
      });
    }
  }, []);

  return null; // This component doesn't render anything
};

export default TokenExpiryHandler;
