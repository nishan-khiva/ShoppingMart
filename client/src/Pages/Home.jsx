import React from 'react';
import MainBanner from '../Components/MainBanner';
import Catagory from '../Components/Catagory';
import BestSeller from '../Components/BestSeller';
import BottomBanner from '../Components/BottomBanner';
import Never from '../Components/Never';
import Footer from '../Components/Footer';

const Home = () => {
  return (
    <div className=' mt-[10vh]'>
      <MainBanner />
      <Catagory />
      <BestSeller />
      <BottomBanner />
      <Never />
      <Footer />
    </div>
  );
};

export default Home;
