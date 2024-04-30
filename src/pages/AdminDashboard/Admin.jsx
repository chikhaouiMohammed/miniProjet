import ReactCountryFlag from "react-country-flag"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from "react";
import userImg from '../../images/Home/paymentPage/alexander-hipp-iEEBWgY_6lA-unsplash.jpg'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ContactEmergencyOutlinedIcon from '@mui/icons-material/ContactEmergencyOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import './admin.css'
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";


function Admin({ chartData }) {
    const [arrowStatus, setArrowStatus] = useState(false);
    const [language, setLanguage] = useState('EN');
    
    const handleLanguageChange = (value) => {
        setLanguage(value);
    };
    const options = {
        plugins: {
          legend: false
        },
        scales: {
            y:{
                beginAtZero:true,
                ticks:{
                    stepSize: 100
                }
            },
          x: {
            grid: {
              display: false
            }
          }
        }
      };
      
      
      

  return (
    <div className="font-poppins">
        <header className='w-full px-[100px] py-[20px] flex justify-between items-center mb-[74px] box-shadow'>
          <div className="navbar bg-transparent">
            <div className="flex-1">
              <a className="btn btn-ghost text-xl">StayDz</a>
            </div>
            <div className="flex-none gap-2">
              <div className="form-control">
                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
              </div>
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
        <div className="mt-3 w-full flex justify-between items-center flex-nowrap">
            {/* Aside bar */}
            <div className=" rounded-r-3xl border-solid border-[1px] border-gray-300 overflow-hidden ">
                {/* Heading */}
                <h2 className="text-center bg-[#cec9c96b] py-[24px] font-bold text-[26px]">Hotels</h2>
                {/* Hotels List */}
                <div className="p-[24px] text-xl text-[#5C5E64] font-medium">
                    <div className="active bg-mainColor text-white py-[15px] px-4 cursor-pointer rounded-lg">LES ZIANIDES</div>
                    <hr />
                    <div className="px-[12px] py-[18px] hover:bg-mainColor hover:text-white duration-300 transition-all cursor-pointer rounded-lg">Renaissance Tlemcen</div>
                    <hr />
                    <div className="px-[12px] py-[18px] hover:bg-mainColor hover:text-white duration-300 transition-all cursor-pointer rounded-lg">ibis Tlemcen</div>
                    <hr />
                    <div className="px-[12px] py-[18px] hover:bg-mainColor hover:text-white duration-300 transition-all cursor-pointer rounded-lg">Grand Bassin</div>
                    <hr />
                    <div className="px-[12px] py-[18px] hover:bg-mainColor hover:text-white duration-300 transition-all cursor-pointer rounded-lg">la perle</div>
                    <hr />
                    <div className="px-[12px] py-[18px] hover:bg-mainColor hover:text-white duration-300 transition-all cursor-pointer rounded-lg">Nedjma</div>
                    <hr />
                    <div className="px-[12px] py-[18px] hover:bg-mainColor hover:text-white duration-300 transition-all cursor-pointer rounded-lg">Relax</div>
                    <hr />
                    <div className="px-[12px] py-[18px] hover:bg-mainColor hover:text-white duration-300 transition-all cursor-pointer rounded-lg">Orient Palace</div>
                    <hr />
                    <div className="px-[12px] py-[18px] hover:bg-mainColor hover:text-white duration-300 transition-all cursor-pointer rounded-lg">Stambouli</div>
                    <hr />
                    <div className="px-[12px] py-[18px] hover:bg-mainColor hover:text-white duration-300 transition-all cursor-pointer rounded-lg">Olympic</div>
                    <hr />
                    <div className="px-[12px] py-[18px] hover:bg-mainColor hover:text-white duration-300 transition-all cursor-pointer rounded-lg">Islam ll Tlemcen</div>
                    <hr />
                    <div className="px-[12px] py-[18px] hover:bg-mainColor hover:text-white duration-300 transition-all cursor-pointer rounded-lg">El menzah kazi</div>
                    <hr />
                    <div className="px-[12px] py-[18px] hover:bg-mainColor hover:text-white duration-300 transition-all cursor-pointer rounded-lg">Venisia Hotel Tlemcen</div>
                    <hr />
                </div>
            </div>
            {/* Dashboard */}
            <div className=" px-10">
                {/* Hotel Details */}
                <div className="flex justify-between items-center flex-wrap">
                    {/* Email */}
                    <div className="flex justify-start items-center gap-3 px-[17px] py-[11px] bg-[#F5F5F5] rounded-xl flex-item">
                        <div><EmailOutlinedIcon fontSize="large"/></div>
                        <div className="flex justify-center items-center gap-2 text-base"><span className="text-black font-semibold">Email:</span><span className="text-[#000000a4] font-medium">zianides.hotel.tlemcen@gmail.com</span></div>
                    </div>
                    {/* Hotel Name */}
                    <div className="flex justify-start items-center gap-3 px-[17px] py-[11px] bg-[#F5F5F5] rounded-xl flex-item">
                        <div><ContactEmergencyOutlinedIcon fontSize="large"/></div>
                        <div className="flex justify-center items-center gap-2 text-base"><span className="text-black font-semibold">Hotel Name:</span><span className="text-[#000000a4] font-medium">LES ZIANIDES</span></div>
                    </div>
                    {/* Phone */}
                    <div className="flex justify-start items-center gap-3 px-[17px] py-[11px] bg-[#F5F5F5] rounded-xl flex-item">
                        <div><LocalPhoneOutlinedIcon fontSize="large"/></div>
                        <div className="flex justify-center items-center gap-2 text-base"><span className="text-black font-semibold">Phone:</span><span className="text-[#000000a4] font-medium">0770913805</span></div>
                    </div>
                    {/* Location */}
                    <div className="flex justify-start items-center gap-3 px-[17px] py-[11px] bg-[#F5F5F5] rounded-xl flex-item">
                        <div><FmdGoodOutlinedIcon fontSize="large"/></div>
                        <div className="flex justify-center items-center gap-2 text-base"><span className="text-black font-semibold">Location:</span><a href="" className="text-blue-600 font-medium">Location Link</a></div>
                    </div>
                </div>
                <div className="text-center my-10 font-semibold text-xl">Total Visitors</div>
                {/* Line Chart Dashboard */}
                <div className="w-full mt-10">
                    <Line style={{width:"100%"}} data={chartData} options={options}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Admin
