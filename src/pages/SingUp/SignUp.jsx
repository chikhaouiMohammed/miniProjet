import React from 'react'
import imglogin1 from '../../assets/25f3792bb151520d1ae87926e8e6633a 1.png'
import { FcGoogle } from "react-icons/fc";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import iconfcb from '../../assets/icons8-facebook-nouveau-64.png'
import { Link } from 'react-router-dom';


const SignUp = () => {
  return (
    <div className=' w-full h-screen flex items-start'>
      <div className='relative w-1/2 h-full flex flex-col'>
      <img className=' h-full w-full object-cover' src={imglogin1} alt="" />
      </div>
    <div className='w-1/2 h-full bg-[#FFFFFF] flex flex-col p-20 justify-between items-center '>
        
      <div className='w-full flex flex-col max-w-[500px]'>
        <div className='w-full flex flex-col mb-5'>
            <h3 className='text-3xl font-medium mb-4'>Sign Up</h3>
            <p className='text-sm mb-2'>If you already have an account register
            <br />
            You can &nbsp;  
            <Link to='/login' className=' text-mainColor cursor-pointer'>
            Login here !
            </Link >
            </p>
        </div>
      <div className='w-full flex flex-col mt-3 '>
        <div className='relative'>
          <label  htmlFor="email">Email</label>
          <TfiEmail className='absolute bottom-7'/>
          <input type="email" 
          id="email"
          placeholder='Enter Your Email Address'
          className='w-full text-black py-3 pl-7 my-3 border-b border-[#FF432A] outline-none focus:outline-none bg-none'
          /> 
        </div>
        <div className='relative'>
          <label  htmlFor="email">First Name</label>
          <CiUser className='absolute bottom-7'/>
          <input type="text" 
          
          placeholder='Enter Your First Name'
          className='w-full text-black py-3 pl-6 my-3 border-b border-black outline-none focus:outline-none bg-none'
          /> 
        </div>
        <div className='relative'>
          <label  htmlFor="email">Last Name</label>
          <CiUser className='absolute bottom-7'/>
          <input type="text" 
        
          placeholder='Enter Your Last Name'
          className='w-full text-black py-3 pl-6 my-3 border-b border-black outline-none focus:outline-none bg-none'
          /> 
        </div>
        <div className='relative'>
        <label className='mt-8' htmlFor="">Password</label>
          <RiLockPasswordLine className='absolute bottom-7 ' />
          <input type="password"
          placeholder=' Entrer Your Password'
          className='w-full text-black py-3 pl-5 my-3 border-b border-black outline-none focus:outline-none bg-none'
          />
        </div>
        <div className='relative'>
          <label  htmlFor="email">Confirm Password</label>
          <RiLockPasswordLine className='absolute bottom-7'/>
          <input type="password" 
          
          placeholder='Confirm Your Password'
          className='w-full text-black py-3 pl-6 my-3 border-b border-black outline-none focus:outline-none bg-none'
          /> 
        </div>
      </div>
      
        <div className='w-full flex flex-col mt-7 pt-7'>
          <button className='w-full my-1 bg-mainColor rounded-3xl shadow p-4 text-center text-white flex items-center justify-center font-medium '>Register</button>
        </div>
    </div>
    </div>
    </div>
  )
}

export default SignUp