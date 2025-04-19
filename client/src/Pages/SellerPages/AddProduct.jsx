import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("id");

  const [formdata, setFormdata] = useState({
    productname: "",
    productdesc: "",
    productcategory: "",
    productprice: "",
    sellprice: ""
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    // Fetch product data if editing
    if (productId) {
      axios.get(`https://shoppingmart-u430.onrender.com/products/${productId}`).then((res) => {
        const { productname, productdesc, productcategory, productprice, sellprice } = res.data;
        setFormdata({ productname, productdesc, productcategory, productprice, sellprice });
        setPreviewImage(`https://shoppingmart-u430.onrender.com/uploads/${res.data.productimage}`);
      }).catch(err => console.error("Failed to fetch product:", err));
    }

    // ✅ Fetch category list for dropdown
    axios.get('https://shoppingmart-u430.onrender.com/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error("Failed to fetch categories", err));
  }, [productId]);

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formdata).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (imageFile) {
      data.append("productimage", imageFile);
    }

    try {
      let response;
      if (productId) {
        response = await axios.put(`https://shoppingmart-u430.onrender.com/products/${productId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        response = await axios.post("https://shoppingmart-u430.onrender.com/products/", data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      if (response.status === 200 || response.status === 201) {
        alert(productId ? 'Product updated!' : 'Product added!');
        setFormdata({
          productname: "",
          productdesc: "",
          productcategory: "",
          productprice: "",
          sellprice: ""
        });
        setImageFile(null);
        setPreviewImage(null);
        // navigate("/seller/product-list");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Submission failed");
    }
  };


 
  return (
    <div className='px-3'>
      <form onSubmit={handleSubmit}>
        <div className='flex gap-6'>
          <div>
            <div className="text-lg mb-2">
              <h3 className='font-semibold text-[16px]'>Product Name</h3>
              <input
                type='text'
                name="productname"
                value={formdata.productname}
                onChange={handleChange}
                placeholder='Type here'
                className='px-2 py-1 text-[16px] rounded border border-gray-500 font-serif w-[32vw]' />
            </div>

            <div className="text-lg mb-2">
              <h3 className='font-semibold text-[16px]'>Product Description</h3>
              <textarea
                name="productdesc"
                value={formdata.productdesc}
                onChange={handleChange}
                placeholder='Type here'
                rows={4}
                className='text-[16px] px-2 py-1 rounded border border-gray-500 font-serif w-[32vw]' />
            </div>

            <div className="text-lg mb-2">
              <h3 className='font-semibold text-[16px]'>Categories</h3>
              <select
                name="productcategory"
                value={formdata.productcategory}
                onChange={handleChange}
                className='p-2 border w-[32vw] rounded font-serif text-[16px]'>
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>{cat.name}</option>
                ))}
              </select>

            </div>

            <div className='flex gap-5 py-2'>
              <div>
                <h3 className='font-semibold'>Product Price</h3>
                <input
                  name="productprice"
                  value={formdata.productprice}
                  onChange={handleChange}
                  type='number'
                  className='border rounded h-[7vh] p-2 w-[15vw]' />
              </div>
              <div>
                <h3 className='font-semibold'>Offer Price</h3>
                <input
                  name="sellprice"
                  value={formdata.sellprice}
                  onChange={handleChange}
                  type='number'
                  className='border rounded h-[7vh] p-2 w-[15vw]' />
              </div>
            </div>

            <button type='submit' className='bg-green-600 rounded text-white px-4 py-2 w-[6vw]'>
              {productId ? 'Update' : 'Add'}
            </button>
          </div>

          <div className='px-10 py-8'>
            <label htmlFor="fileInput">
              <div className=" border border-gray-300 rounded overflow-hidden cursor-pointer flex items-center justify-center">
                <img
                  src={ "/assets/upload_area.png" || previewImage }
                  className='w-full h-full object-cover'
                  alt="upload"
                />
              </div>
            </label>
            <input
              type="file"
              id="fileInput"
              name="productimage"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
