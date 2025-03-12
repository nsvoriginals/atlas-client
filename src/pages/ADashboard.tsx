import { Footer } from '../components/Footer';
import React from 'react';

export const Dashboard = () => {
  return (
    <div className="w-screen flex flex-col items-center justify-start  ">
      <div className='flex justify-around gap-10 items-center'>
        <h1 className="text-7xl"> Welcome USER</h1>
        <div className='w-10 h-10 bg-black rounded-full text-center'></div>
        </div>
      <h1 className="text-5xl mt-10">Services</h1>
      
      <div className="w-full flex flex-wrap justify-center gap-8 mt-8 px-8">
        <div className="w-[40%] h-[40vh] bg-red-300 rounded-lg flex items-center justify-center shadow-md">
          <h1 className="text-2xl font-bold">Interview Questions Generator</h1>
        </div>
        
        <div className="w-[40%] h-[40vh] bg-red-300 rounded-lg flex items-center justify-center shadow-md">
          <h1 className="text-2xl font-bold">ATS Tracker</h1>
        </div>
        
        <div className="w-[40%] h-[40vh] bg-red-300 rounded-lg flex items-center justify-center shadow-md">
          <h1 className="text-2xl font-bold">Resume Builder</h1>
        </div>
        
        <div className="w-[40%] h-[40vh] bg-red-300 rounded-lg flex items-center justify-center shadow-md">
          <h1 className="text-2xl font-bold">Jobs Finder</h1>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Dashboard;