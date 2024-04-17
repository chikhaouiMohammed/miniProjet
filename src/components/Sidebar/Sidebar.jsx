import React from 'react'
import userImg from '../../assets/account img.png'
import './Sidebar.css'
import { MdChevronRight } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

import { IoIosLogIn } from "react-icons/io";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { SlSocialDribbble } from "react-icons/sl";
import { ImConnection } from "react-icons/im";
import { IoMdNotificationsOutline } from "react-icons/io";
const Sidebar = () => {
  return (

    <nav className='sidebar'>
        <header>
            <div className='image-text'>
                
                <span className='image'>
                <img src={userImg} alt="" />
                </span>
                <div className='text header-text'>
                    <span className='name'>issam13</span>
                    <span className='email'>issam13@gmail.com</span>
                </div>
            </div>
        <i className='toggle'><MdChevronRight /> </i> 
        </header>
        <div className='menu-bar'>
          <div className='menu'>
          <li className='search-box'>
              <CiSearch className='icon' />
              <input type="search" placeholder='search..' />
          </li>
            <ul className='menu-links'>
              <li className='nav-links'>
                <a href="#">
                <IoHomeOutline className='icon'/>
                <span className='text nav-text'>Home</span>
                </a>
              </li>
              <li className='nav-links'>
                <a href="#">
                <MdOutlinePublishedWithChanges className='icon'/>
                <span className='text nav-text'>Change Password</span>
                </a>
              </li>
              <li className='nav-links'>
                <a href="#">
                <IoInformationCircleOutline  className='icon'/>
                <span className='text nav-text'>Info</span>
                </a>
              </li>
              <li className='nav-links'>
                <a href="#">
                <SlSocialDribbble className='icon'/>
                <span className='text nav-text'>Social Link</span>
                </a>
              </li>
              <li className='nav-links'>
                <a href="#">
                <ImConnection className='icon'/>
                <span className='text nav-text'>connection</span>
                </a>
              </li>
              <li className='nav-links'>
                <a href="#">
                <IoMdNotificationsOutline className='icon'/>
                <span className='text nav-text'>Notification</span>
                </a>
              </li>
            </ul>
          </div>
          <div className='btn-content'>
          <li className=''>
                <a href="#">
                <IoSettingsOutline   className='icon'/>
                <span className='text nav-text'>Setting</span>
                </a>
              </li>
              <li>
                <a href="#">
                <IoIosLogIn  className='icon'/>
                <span className='text nav-text'>Logout</span>
                </a>
              </li>
          </div>
        </div>
    </nav>
    
  )
}

export default Sidebar