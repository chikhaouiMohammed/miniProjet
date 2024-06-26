import { useContext, useEffect, useState } from 'react';
import ReactCountryFlag from "react-country-flag"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import userImg from '../../images/Home/paymentPage/alexander-hipp-iEEBWgY_6lA-unsplash.jpg'
import { FiEdit } from "react-icons/fi";
import { PiHouse } from "react-icons/pi";
import { RiHotelBedFill } from "react-icons/ri";
import { IoBookmarkOutline } from "react-icons/io5";
import { Line } from "react-chartjs-2";
import Dashboard from './Routes/Dashboard';
import FrontDesk from './Routes/FrontDesk';
import RoomTypes from './Routes/RoomTypes';
import { Link } from 'react-router-dom';
import { Menu, MenuItem, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../../images/logo.png"

function HotelOwner() {
  
  
  const [isDash, setIsDash] = useState(true);
  const [isDesk, setIsDesk] = useState(false);
  const [isRoom, setIsRoom] = useState(false);

  

  const handleDashClick = ()=>{
    setIsDash(true)
    setIsDesk(false)
    setIsRoom(false)
  }
  const handleDeskClick = ()=>{
    setIsDash(false)
    setIsDesk(true)
    setIsRoom(false)
  }
  const handleRoomClick = ()=>{
    setIsDash(false)
    setIsDesk(false)
    setIsRoom(true)
  }
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
    
  return (
    
    <div className=' font-poppins'>
        
       {/* <header className='w-full px-[100px] py-[20px] flex justify-between items-center mb-[74px] box-shadow'>
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
  <Link to="/accountUser/User" className="justify-between">
    <a className="badge">New</a>
  </Link>
</li>
                  <li><a>Logout</a></li>
                </ul>
              </div>
            </div>
          </div>
        </header>
  */}
  <header className="w-full h-[100px] overflow-hidden px-[100px] py-[20px] flex justify-between items-center mb-[74px] box-shadow">
     {/* Logo */}
      <div className='w-[250px] cursor-pointer'><img className='w-full h-full' src={logo} alt="" /></div>

      {/* Profile Dropdown */}
      <div className="relative">
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleClick}
          color="inherit"
          size="large" // Adjust the size here
        >
          <AccountCircleIcon sx={{ fontSize: 38 }} /> {/* Adjust the font size here */}
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          getContentAnchorEl={null} // Ensure anchorEl doesn't affect menu positioning
          className="mt-2"
        >
          <Link to="/accountUser/User">
          <MenuItem onClick={handleClose}>Profile New</MenuItem>
         </Link>
         <Link to="/login">
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Link>
        </Menu>
      </div>
    </header>
        {/* Content */}
        <div className='flex justify-center items-start gap-5 w-full '>
          {/* Aside */}
          <div className='w-fit h-full px-3 '>
            <ul className='flex flex-col justify-center items-center gap-10 h-full'>
              <li className='cursor-pointer'><a className='flex justify-center items-start gap-2 transition-all duration-300 hover:text-mainColor'><span><PiHouse style={{fontWeight: 400, fontSize:"28px"}}/></span><span className='text-xl font-semibold' onClick={handleDashClick}>Dashboard</span></a></li>
              <li className='cursor-pointer'><a className='flex justify-center items-start gap-2 transition-all duration-300 hover:text-mainColor'><span><FiEdit style={{fontWeight: 300, fontSize:"25px"}}/></span><span className='text-xl font-semibold' onClick={handleDeskClick}>Front Desk</span></a></li>
              <li className='cursor-pointer'><a className='flex justify-center items-start gap-2 transition-all duration-300 hover:text-mainColor'><span><IoBookmarkOutline style={{fontWeight: 400, fontSize:"27px"}}/></span><span className='text-xl font-semibold' onClick={handleRoomClick}>Room Type</span></a></li>
            </ul>
          </div>
          
         {isDash && <Dashboard/>}
         {isDesk && <FrontDesk/>}
         {isRoom && <RoomTypes/>}
        </div>
    </div>
  )
}

export default HotelOwner
