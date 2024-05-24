import { useState,useContext, useEffect } from "react";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ContactEmergencyOutlinedIcon from '@mui/icons-material/ContactEmergencyOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import './admin.css'
import { Line  } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

import { db } from "../../Data/Firebase";
import { collection, doc, getDocs,getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { Menu,MenuItem, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AuthContext } from "../../context/AuthContext";
import HotelVisitors from "./Data/HotelVisitors";
import TopCountries from "./Data/TopCountries";
import HotelRevenue from "./Data/HotelRevenue";




function Admin() {
  

    
   

   useEffect(() => {
     
    fetchHotels(); 
    
  }, []);
  


  
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
      const [hotelName, setHotelName] = useState(""); 
      const [hotelPhone, setHotelPhone] = useState("");
      const [hotelEmail, setHotelEmail] = useState("");
      const [localisation, setLocalisation] = useState("");

        const fetchHotelData = async (hotelId) => {
            try {
                
                const hotelRef = doc(collection(db, 'hotelList', 'Tlemcen', 'hotels'), hotelId);
                const hotelDoc = await getDoc(hotelRef);
                if (hotelDoc.exists()) {
                    
                    const hotelName = hotelDoc.data().name;
                    const hotelPhone=hotelDoc.data().phone;
                    const hotelEmail = hotelDoc.id; 
                    const localisation=hotelDoc.data().mapLink;
                    setHotelEmail(hotelEmail);
                    setHotelName(hotelName);
                    setHotelPhone(hotelPhone);
                    setLocalisation(localisation);
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

        const [hotels, setHotels] = useState([]);
        const fetchHotels = async () => {
          try {
            const hotelsRef = collection(db, 'hotelList', 'Tlemcen', 'hotels');
            const snapshot = await getDocs(hotelsRef);
            const hotelsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setHotels(hotelsData);
          } catch (error) {
            console.error('Error fetching hotels:', error);
          }
        };
        const [activeHotel, setActiveHotel] = useState(null);

  const handleHotelClick = (hotelId) => {
    // Set the active hotel when clicked
    setActiveHotel(hotelId);
    // Fetch data for the selected hotel
    fetchHotelData(hotelId);
  };
  console.log(hotelEmail)

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
      <Link to="/login">
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Link>
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
                   
                {hotels.map(hotel => (
              <div 
              key={hotel.id} 
              className={`py-[15px] px-4 cursor-pointer rounded-lg ${activeHotel === hotel.id ? 'bg-mainColor text-white' : 'bg-[#F5F5F5] text-black hover:bg-mainColor hover:text-white'}`} 
              onClick={() => {
                fetchHotelData(hotel.id); // First action: fetch hotel data
                handleHotelClick(hotel.id); // Second action: set active hotel
              }}
            >
              {hotel.name}
            </div>
            
            ))}
                    
                   
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
                        <div className="flex justify-center items-center gap-2 text-base"><span className="text-black font-semibold">Location:</span><a href={localisation} className="text-blue-600 font-medium">location link</a></div>
                    </div>
                </div>
                <h3 className="text-center text-black my-10 font-bold text-2xl">Hotel Statistic</h3> 
                {/* Line Chart Dashboard */}
                <div className="w-full my-10">
                
              
      
</div>
                <div className="flex justify-center items-center gap-7">
                  {/* total visitors */}
                  {hotelEmail && <HotelVisitors hotelEmail={hotelEmail}/>}
                  {/* Top Contries */}

                  {hotelEmail && <TopCountries hotelEmail={hotelEmail}/>}

                  {/* Hotel Revenue */}
    
                   {hotelEmail && <HotelRevenue hotelEmail={hotelEmail}/>}

                </div>
            </div>
        </div>
    </div>
  )
}

export default Admin