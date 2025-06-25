import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../Api/axiosInstance';
const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState({});

    // Toggle Wishlist (add/remove)
    const toggleWishlist = async (product) => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return alert('Please login first');
  
        await api.post('/api/wishlist/toggle', {
          productId: product._id,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
  
        setWishlist(prev => {
          const updated = { ...prev };
          if (updated[product._id]) {
            delete updated[product._id];
          } else {
            updated[product._id] = product;
          }
          return updated;
        });
      } catch (error) {
        console.error('Toggle wishlist failed:', error.message);
      }
    };
  
    useEffect(() => {
      fetchWishlist();
    }, []);

  // Load wishlist from backend
  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await api.get('/api/wishlist/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const wishlistMap = {};
      res.data.forEach(product => {
        wishlistMap[product._id] = product;
      });

      setWishlist(wishlistMap);
    } catch (error) {
      console.error('Error fetching wishlist:', error.message);
    }
  };



  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist,fetchWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
