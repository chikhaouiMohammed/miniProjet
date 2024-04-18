import { useState } from 'react';
import ReactCountryFlag from "react-country-flag"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import userImg from '../../images/Home/paymentPage/alexander-hipp-iEEBWgY_6lA-unsplash.jpg'
import { FiEdit } from "react-icons/fi";
import { PiHouse } from "react-icons/pi";
import { RiHotelBedFill } from "react-icons/ri";
import { IoBookmarkOutline } from "react-icons/io5";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import Dashboard from './Routes/Dashboard';


function HotelOwner() {
  const [arrowStatus, setArrowStatus] = useState(false);
    const [language, setLanguage] = useState('EN');
    const handleLanguageChange = (value) => {
        setLanguage(value);
    };

    
  return (
    
    <div className=' font-poppins'>
        
        <header className='w-full px-[100px] py-[20px] flex justify-between items-center mb-[74px] box-shadow'>
          <div className="navbar bg-transparent">
            <div className="flex-1">
              <a className="btn btn-ghost text-xl">StayDz</a>
            </div>
            <div className="flex-none gap-2">
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li><a>Logout</a></li>
                </ul>
              </div>
            </div>
          </div>
        </header>
        {/* Content */}
        <div className='flex justify-center items-start gap-5 w-full '>
          {/* Aside */}
          <div className='w-fit h-full px-3 '>
            <ul className='flex flex-col justify-center items-center gap-10 h-full'>
              <li className=''><a className='flex justify-center items-start gap-2 transition-all duration-300 hover:text-mainColor' href="/dashboard"><span><PiHouse style={{fontWeight: 400, fontSize:"28px"}}/></span><span className='text-xl font-semibold'>Dashboard</span></a></li>
              <li className=''><a className='flex justify-center items-start gap-2 transition-all duration-300 hover:text-mainColor' href="/front-desk"><span><FiEdit style={{fontWeight: 300, fontSize:"25px"}}/></span><span className='text-xl font-semibold'>Front Desk</span></a></li>
              <li className=''><a className='flex justify-center items-start gap-2 transition-all duration-300 hover:text-mainColor' href="/room-type"><span><IoBookmarkOutline style={{fontWeight: 400, fontSize:"27px"}}/></span><span className='text-xl font-semibold'>Room Type</span></a></li>
            </ul>
          </div>
          {/* details content */}
         <Dashboard/>
        </div>
    </div>
  )
}

export default HotelOwner
