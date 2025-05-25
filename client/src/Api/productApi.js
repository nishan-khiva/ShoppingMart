import api from "./axiosInstance";
//Get All produt list
export const fetchProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

//Best Seller List
export  const fetchBestSellers = async () => {
      try {
        const res = await api.get('/products/bestsellers');
        return res.data;
      } catch (error) {
        console.error("Error fetching best seller products:", error);
      }
    };

//Catagories list
export const fetchCategory = async ()=>{
  try{
    const res = await api.get('/categories');
    return res.data;
  }catch(error){
    console.error("Erro fetching categories", error)
  }
}