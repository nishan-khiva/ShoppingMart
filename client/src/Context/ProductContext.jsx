import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchProducts, fetchBestSellers, fetchCategory } from "../Api/productApi";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bestproducts, setBestproducts] = useState([])
  const [categories, setCategories] = useState([]);

  //All products 
  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading products:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    loadProducts();
  }, []);

  //best Seller products
  useEffect(() => {
    const best = async () => {
      try {
        const bestdata = await fetchBestSellers();
        setBestproducts(bestdata);
      } catch (error) {
        console.error("Error loading best products", error);
      }
    };
    best();
  }, []);

  //Catagoreis 
  useEffect(() => {
    const category = async () => {
      const catdata = await fetchCategory();
      setCategories(catdata);
    }
    category();
  }, [])



  return (
    <ProductContext.Provider value={{
      products, setProducts, loadProducts, loading, bestproducts, setBestproducts, categories,setCategories
    }}>
      {children}
    </ProductContext.Provider>
  );
};
