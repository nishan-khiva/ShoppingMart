import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Pages
import Home from './Pages/Home';
import Seller from './Pages/Seller';
import ShoppingCart from './Pages/ShopingCart';
import AllProducts from './Pages/AllProducts';

//Seller Pages(Admin)
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

//components
import Navbar from './Components/Navbar';
import CategoryProducts from './Components/CategoryProducts';

//User profile pages
import UserProfileLayout from './UserProfile/MyAccount';
import ProfileOverview from './UserProfile/overview';
import Myorders from './UserProfile/Myorders';
import Wishlist from './UserProfile/Wishlist';
import PrivateRoute from './UserProfile/Protected';
import ViewDetails from './UserProfile/ViewDetails';
import ManageAddress from './UserProfile/ManageAddress';

//Context
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
<<<<<<< HEAD
      <ProductProvider>
        <RoleProvider>
          <WishlistProvider>
            <SearchProvider>
              <CartProvider>
                <Toaster position="top-center" reverseOrder={false} />
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="*" element={<Home />} />
                  <Route path="/all-products" element={<AllProducts />} />
                  <Route path="/shoping" element={<ShoppingCart />} />
                  <Route path="/category/:categoryName" element={<CategoryProducts />} />

                  {/* Admin Route */}
                  <Route path="/seller-login" element={<SellerLogin setIsSellerLoggedIn={setIsSellerLoggedIn} />} />
                  <Route path="/seller" element={
                    <ProtectedRoute isSellerLoggedIn={isSellerLoggedIn}>
                      <Seller />
                    </ProtectedRoute>}>
                    <Route index element={<Dashboard />} />
                    <Route path="add-product" element={<AddProduct />} />
                    <Route path="add-category" element={<AddCategory />} />
                    <Route path="product-list" element={<ProductList />} />
                    <Route path="order-list" element={<OrderList />} />
                    <Route path="employee-list" element={<EmployeeList />} />
                    <Route path="add-employee" element={<AddEmployee />} />
                    <Route path="full-details" element={<OrderDetails />} />
                  </Route>

                  {/*  User Account Route  */}
                  <Route path="/myaccount" element={<PrivateRoute><UserProfileLayout /></PrivateRoute>}>
                    <Route index element={<ProfileOverview />} />
                    <Route path='profile' element={<ProfileOverview />} />
                    <Route path='myoders' element={<Myorders />} />
                    <Route path='wishlist' element={<Wishlist />} />
                    <Route path='viewdetails' element={<ViewDetails />} />
                    <Route path='address' element={<ManageAddress />} />
                  </Route>
                </Routes>
              </CartProvider>
            </SearchProvider>
          </WishlistProvider>
        </RoleProvider>
      </ProductProvider>

=======
       <SearchProvider>
      <CartProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="*" element={<Home />} />
        <Route path="/seller-login" element={<SellerLogin setIsSellerLoggedIn={setIsSellerLoggedIn} />} />
       
        <Route path="/seller" element={
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
        </Route>
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/shoping" element={<ShoppingCart />} />
        <Route path="/category/:categoryName" element={<CategoryProducts />} />
        <Route path="*" element={<Home />} />
      </Routes>
      </CartProvider>
      </SearchProvider>
>>>>>>> 228af4e1b70531c6c8fff6514f7f5642713734d2
    </Router>
  );
};

export default App;
