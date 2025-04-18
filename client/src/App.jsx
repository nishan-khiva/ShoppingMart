import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Seller from './Pages/Seller';
import AddProduct from './Pages/SellerPages/AddProduct';
import ProductList from './Pages/SellerPages/ProductList';
import OrderList from './Pages/SellerPages/OrderList';
import SellerLogin from './Pages/SellerPages/SellerLogin';
import ProtectedRoute from './Pages/SellerPages/ProtectedRoute';
import AllProducts from './Pages/AllProducts';
import Dashboard from './Pages/SellerPages/Dashboard';
import ShoppingCart from './Pages/ShopingCart';
import Navbar from './Components/Navbar';
import { CartProvider } from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import AddCategory from './Pages/SellerPages/AddCategory';
import EmployeeList from './Pages/SellerPages/Employee/EmployeeList';
import AddEmployee from './Pages/SellerPages/Employee/AddEmployee';
import CategoryProducts from './Components/CategoryProducts'; 
import { SearchProvider } from './Context/SearchContext';

const App = () => {
  const [isSellerLoggedIn, setIsSellerLoggedIn] = useState(() => {
    return localStorage.getItem('isSellerLoggedIn') === 'true';
  });

  return (
    <Router>
       <SearchProvider>
      <CartProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
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
      </Routes>
      </CartProvider>
      </SearchProvider>
    </Router>
  );
};

export default App;
