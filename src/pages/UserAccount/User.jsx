import React, { useState }  from 'react'
import './User.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import userImg from '../../assets/account img.png'
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";

const User = () => {
  const [userProfile, setUserProfile] = useState({
    name: '',
    country: '',
    phoneNumber: '',
    password: '',
    email: '',
   
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUploadPhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setUserProfile(prevState => ({
        ...prevState,
        profileImage: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleResetPhoto = () => {
    setUserProfile(prevState => ({
      ...prevState,
      profileImage: userImg // Reset the profile image to the default image
    }));
  };

  return (
    <div>
      <Sidebar/>
      <div className="w-full h-full flex items-center justify-center">
        <div className="mt-5">
        <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Account Settings</h1>
       </div>
          <div className="flex items-center">
            
            <img src={userProfile.profileImage || userImg} alt="Profile" className="rounded h-24 w-24 mr-4" />
            <div className='flex justify-between space-x-8'>
              <label htmlFor="upload" className='bg-mainColor rounded flex justify-center items-center pt-3 pb-3 pl-10 pr-10 font-bold text-base text-white cursor-pointer'>Upload Photo</label>
              <input type="file" id="upload" onChange={handleUploadPhoto} style={{ display: 'none' }} />
              <button className='bg-white rounded border border-mainColor flex justify-center items-center pt-3 pb-3 pl-10 pr-10 font-bold text-base text-mainColor' onClick={handleResetPhoto}>Reset</button>
            </div>
          </div>
          <div className="mt-10 mb-10 flex flex-col gap-8 w-auto">
          <div className='relative'>
           <label  htmlFor="email"> First Name</label>
           <CiUser className='absolute bottom-7'/>
          <input type="text" 
          
          placeholder='user'
          className='w-full text-black py-3 pl-6 my-3 border-b border-black outline-none focus:outline-none bg-none'
          /> 
        </div>
        <div className='relative'>
           <label  htmlFor="email">Last Name</label>
           <CiUser className='absolute bottom-7'/>
          <input type="text" 
        
          placeholder='user123'
          className='w-full text-black py-3 pl-6 my-3 border-b border-black outline-none focus:outline-none bg-none'
          /> 
        </div>
          <div className='relative'>
           <label  htmlFor="email">Email</label>
           <TfiEmail className='absolute bottom-7'/>
          <input type="email" 
          id="email"
          placeholder='User13@gmail.com'
          className='w-full text-black py-3 pl-7 my-3 border-b border-[#FF432A] outline-none focus:outline-none bg-none'
          /> 
        </div>
        <div className='relative'>
        <label className='mt-8' htmlFor="">Password</label>
          <RiLockPasswordLine className='absolute bottom-7 ' />
          <input type="password" 
       
          placeholder='123456789'
          className='w-full text-black py-3 pl-5 my-3 border-b border-black outline-none focus:outline-none bg-none'
        
          />
        </div>
       
            
           
          </div>
          <div className=" flex justify-between space-x-4 mt-6">
            <button className="bg-mainColor rounded flex justify-center items-center pt-3 pb-3 pl-10 pr-10 font-bold text-base text-white cursor-pointer">Save Changes</button>
            <button className="bg-white rounded border border-mainColor flex justify-center items-center pt-3 pb-3 pl-10 pr-10 font-bold text-base text-mainColor">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User;
