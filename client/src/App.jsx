
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Pages
import Home from './Pages/Home';
import Seller from './Pages/Seller';
import ShoppingCart from './Pages/ShopingCart';
import AllProducts from './Pages/AllProducts';

// Seller Pages (Admin)
import AddProduct from './SellerPages/AddProduct';
import ProductList from './SellerPages/ProductList';
import OrderList from './SellerPages/OrderList';
import SellerLogin from './SellerPages/SellerLogin';
import ProtectedRoute from './SellerPages/ProtectedRoute';
import Dashboard from './SellerPages/Dashboard';
import AddCategory from './SellerPages/AddCategory';
import EmployeeList from './SellerPages/Employee/EmployeeList';
import AddEmployee from './SellerPages/Employee/AddEmployee';
import OrderDetails from './SellerPages/OrderDetails';

// Components
import Navbar from './Components/Navbar';
import CategoryProducts from './Components/CategoryProducts';

// User Profile Pages
import UserProfileLayout from './UserProfile/MyAccount';
import ProfileOverview from './UserProfile/overview';
import Myorders from './UserProfile/Myorders';
import Wishlist from './UserProfile/Wishlist';
import PrivateRoute from './UserProfile/Protected';
import ViewDetails from './UserProfile/ViewDetails';
import ManageAddress from './UserProfile/ManageAddress';

// Context Providers
import { CartProvider } from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import { SearchProvider } from './Context/SearchContext';
import { WishlistProvider } from './Context/WishlistContext';
import { RoleProvider } from './Context/RoleContext';
import { ProductProvider } from './Context/ProductContext';

const App = () => {
  const [isSellerLoggedIn, setIsSellerLoggedIn] = useState(() => {
    return localStorage.getItem('isSellerLoggedIn') === 'true';
  });

  return (
    <Router>
      <ProductProvider>
        <RoleProvider>
          <WishlistProvider>
            <SearchProvider>
              <CartProvider>
                <Toaster position="top-center" reverseOrder={false} />
                <Navbar />
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="*" element={<Home />} />
                  <Route path="/all-products" element={<AllProducts />} />
                  <Route path="/shoping" element={<ShoppingCart />} />
                  <Route path="/category/:categoryName" element={<CategoryProducts />} />

                  {/* Seller/Admin Routes */}
                  <Route path="/seller-login" element={<SellerLogin setIsSellerLoggedIn={setIsSellerLoggedIn} />} />
                  <Route
                    path="/seller"
                    element={
                      <ProtectedRoute isSellerLoggedIn={isSellerLoggedIn}>
                        <Seller />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Dashboard />} />
                    <Route path="add-product" element={<AddProduct />} />
                    <Route path="add-category" element={<AddCategory />} />
                    <Route path="product-list" element={<ProductList />} />
                    <Route path="order-list" element={<OrderList />} />
                    <Route path="employee-list" element={<EmployeeList />} />
                    <Route path="add-employee" element={<AddEmployee />} />
                    <Route path="full-details" element={<OrderDetails />} />
                  </Route>

                  {/* User Profile Routes */}
                  <Route
                    path="/myaccount"
                    element={
                      <PrivateRoute>
                        <UserProfileLayout />
                      </PrivateRoute>
                    }
                  >
                    <Route index element={<ProfileOverview />} />
                    <Route path="profile" element={<ProfileOverview />} />
                    <Route path="myoders" element={<Myorders />} />
                    <Route path="wishlist" element={<Wishlist />} />
                    <Route path="viewdetails" element={<ViewDetails />} />
                    <Route path="address" element={<ManageAddress />} />
                  </Route>
                </Routes>
              </CartProvider>
            </SearchProvider>
          </WishlistProvider>
        </RoleProvider>
      </ProductProvider>
    </Router>
  );
};

export default App;