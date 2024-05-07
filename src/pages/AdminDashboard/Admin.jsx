import ReactCountryFlag from "react-country-flag"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState,useContext } from "react";
import userImg from '../../images/Home/paymentPage/alexander-hipp-iEEBWgY_6lA-unsplash.jpg'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ContactEmergencyOutlinedIcon from '@mui/icons-material/ContactEmergencyOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import './admin.css'
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { db } from "../../Data/Firebase";
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { Menu,MenuItem, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from "../../context/AuthContext";
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
      const { currentUser } = useContext(AuthContext);
  const email = currentUser ? currentUser.email : '';
  console.log(email)
      const [hotelName, setHotelName] = useState("Zianide"); 
      const [hotelPhone, setHotelPhone] = useState("213506947");
      const [hotelEmail, setHotelEmail] = useState("Zianides13@gmail.com");
      
        const fetchHotelData = async (hotelId) => {
            try {
                
                const hotelRef = doc(collection(db, 'hotelList', 'Tlemcen', 'hotels'), hotelId);
                const hotelDoc = await getDoc(hotelRef);
                if (hotelDoc.exists()) {
                    
                    const hotelName = hotelDoc.data().name;
                    const hotelPhone=hotelDoc.data().phone;
                    const hotelEmail = hotelDoc.id; 
                    setHotelEmail(hotelEmail);
                    setHotelName(hotelName);
                    setHotelPhone(hotelPhone);
                } else {
                    
                    console.log('Document does not exist');
                }
            } catch (error) {
                console.error('Error fetching document:', error);
            }
        };
        
        const [anchorEl, setAnchorEl] = useState(null);
      
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
      
        const handleClose = () => {
          setAnchorEl(null);
        };
      
      

  return (
    <div className="font-poppins">
      <header className="w-full px-[100px] py-[20px] flex justify-between items-center mb-[74px] box-shadow">
     {/* Logo */}
    <div className="flex-1">
              <a className="btn btn-ghost text-xl">StayDz</a>
            </div>

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
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
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
                    <div className="active bg-mainColor text-white py-[15px] px-4 cursor-pointer rounded-lg"
                    onClick={() => fetchHotelData('Zianides13@gmail.com')}
                    >
                    LES ZIANIDES
                    </div>
                    <hr />
                    <div className="px-[12px] py-[18px] hover:bg-mainColor hover:text-white duration-300 transition-all cursor-pointer rounded-lg"
                    onClick={() => fetchHotelData('renaissance13@gmail.com') }
                    >
                      Renaissance Tlemcen
                    </div>
                    <hr />
                    <div className="px-[12px] py-[18px] hover:bg-mainColor hover:text-white duration-300 transition-all cursor-pointer rounded-lg"  
                    onClick={() => fetchHotelData('ibis13@gmail.com')}
                    >
                      ibis Tlemcen
                    </div>
                    <hr />
                    <div className="px-[12px] py-[18px] hover:bg-mainColor hover:text-white duration-300 transition-all cursor-pointer rounded-lg"
                    onClick={() => fetchHotelData('GrandBassin13@gmail.com')}
                    >
                      Grand Bassin
                    </div>
                    <hr />
                    
                    <hr />
                    
                    <hr />
                    <div className="px-[12px] py-[18px] hover:bg-mainColor hover:text-white duration-300 transition-all cursor-pointer rounded-lg"
                    onClick={() => fetchHotelData('Relax13@gmail.com')}
                    >
                      Relax</div>
                    <hr />
                    <div className="px-[12px] py-[18px] hover:bg-mainColor hover:text-white duration-300 transition-all cursor-pointer rounded-lg"
                    onClick={() => fetchHotelData('OrientPalace13@gmail.com')}
                    >
                      Orient Palace
                      </div>
                    <hr />
                    <div className="px-[12px] py-[18px] hover:bg-mainColor hover:text-white duration-300 transition-all cursor-pointer rounded-lg"
                      onClick={() => fetchHotelData('Stamboli13@gmail.com')}
                    >
                      Stambouli
                    </div>
                    <hr />
                    <div className="px-[12px] py-[18px] hover:bg-mainColor hover:text-white duration-300 transition-all cursor-pointer rounded-lg"
                      onClick={() => fetchHotelData('Olympic13@gmail.com')}
                    >Olympic</div>
                    <hr />
                    <hr />
                    <div className="px-[12px] py-[18px] hover:bg-mainColor hover:text-white duration-300 transition-all cursor-pointer rounded-lg"
                      onClick={() => fetchHotelData('ElMenzahkazi13@gmail.com')}
                    >El menzah kazi</div>
                    <hr />
                    <div className="px-[12px] py-[18px] hover:bg-mainColor hover:text-white duration-300 transition-all cursor-pointer rounded-lg"
                    onClick={() => fetchHotelData('Venisia13@gmail.com')}
                    >
                      Venisia Hotel Tlemcen
                    </div>
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
                        <div className="flex justify-center items-center gap-2 text-base"><span className="text-black font-semibold">Email:</span><span className="text-[#000000a4] font-medium">{hotelEmail}</span></div>
                    </div>
                    {/* Hotel Name */}
                    <div className="flex justify-start items-center gap-3 px-[17px] py-[11px] bg-[#F5F5F5] rounded-xl flex-item">
                        <div><ContactEmergencyOutlinedIcon fontSize="large"/></div>
                        <div className="flex justify-center items-center gap-2 text-base"><span className="text-black font-semibold">Hotel Name:</span><span className="text-[#000000a4] font-medium">{hotelName}</span></div>
                    </div>
                    {/* Phone */}
                    <div className="flex justify-start items-center gap-3 px-[17px] py-[11px] bg-[#F5F5F5] rounded-xl flex-item">
                        <div><LocalPhoneOutlinedIcon fontSize="large"/></div>
                        <div className="flex justify-center items-center gap-2 text-base"><span className="text-black font-semibold">Phone:</span><span className="text-[#000000a4] font-medium">{hotelPhone}</span></div>
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