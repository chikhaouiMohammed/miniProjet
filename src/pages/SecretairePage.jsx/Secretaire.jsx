import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './Secretaire.css'
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { Link } from "react-router-dom";
import {collection,getDocs,deleteDoc,doc, query, where, getDoc} from "firebase/firestore";
import { db } from "../../Data/Firebase";
import profileAvatar from '../../images/blank-profile-picture-973460_1280.png'
import { AuthContext } from '../../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { Menu,MenuItem, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from "../../images/logo.png"
const Secretaire = () => {

  const { currentUser } = useContext(AuthContext);
  const [hotelEmail, setHotelEmail] = useState('');
  const [data, setData] = useState({});
  const [reservationUsers, setReservationUsers] = useState([])


  useEffect(() => {
      const fetchHotelUserId = async () => {
          try {
              const hotelUsersRef = collection(db, 'hotelUsers');
              const hotelUsersQuery = query(hotelUsersRef, where('secreter.email', '==', currentUser.email));
              const hotelUsersSnapshot = await getDocs(hotelUsersQuery);
              if (!hotelUsersSnapshot.empty) {
                  const hotelUserDoc = hotelUsersSnapshot.docs[0];
                  setHotelEmail(hotelUserDoc.id);
              }
          } catch (error) {
              console.error("Error fetching hotel user ID:", error);
          }
      };

      fetchHotelUserId();
  }, [currentUser.email]);


  useEffect(() => {
    const fetchData = async () => {
        try {
            if (!hotelEmail) return; // Make sure hotelEmail is not empty before fetching data
            const docRef = doc(db, "hotelList", "Tlemcen", "hotels", hotelEmail);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const newData = docSnap.data();
                setData(newData);
                // Retrieve the last 10 reservation users
                const lastTenUsers = newData.reservation.slice(-10);
                setReservationUsers(lastTenUsers);
            } else {
                alert("No such document!");
            }
        } catch (error) {
            console.error("Error fetching document:", error);
        }
    };
    fetchData();
}, [hotelEmail]); // Ensure useEffect runs when hotelEmail changes



  console.log(reservationUsers)
    
  const [anchorEl, setAnchorEl] = useState(null);
      
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
/*
  const email = currentUser ? currentUser.email : '';
  console.log(email)
  const [checkIns, setCheckIns] = useState(0);
  const [checkOuts, setCheckOuts] = useState(0);
  useEffect(() => {
    const fetchReservationData = async () => {
      try {
       
        const hotelRef = doc(collection(db, 'hotelList', 'Tlemcen', 'hotels'), email);
        const hotelDoc = await getDoc(hotelRef);

        if (hotelDoc.exists()) {
          
          const reservationData = hotelDoc.data().reservation;
          
          
          
          const checkInsCount = reservationData.filter(entry => entry['checkInDate']).length;
          const checkOutsCount = reservationData.filter(entry => entry['checkOutDate']).length;
          
          
          setCheckIns(checkInsCount);
          setCheckOuts(checkOutsCount);
        } else {
          
          console.log('Document does not exist');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    if (email) {
      fetchReservationData();
    }
  }, [email]);

 const [totalRooms, setTotalRooms] = useState(0);
  
      useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const hotelRef = doc(db, 'hotelList', 'Tlemcen', 'hotels', email );
        const hotelDoc = await getDoc(hotelRef);

        if (hotelDoc.exists()) {
          const totalRooms = hotelDoc.data().TotalRoom;
          setTotalRooms(totalRooms);
        } else {
          console.log("Hotel document not found for the current user");
        }
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    };
    if (email) {
      fetchHotelData();
    }
    
  }, [email]);

  const [occupiedRooms, setOccupiedRooms] = useState(0);
  const availableRooms = totalRooms - occupiedRooms;
  useEffect(() => {
  const calculateOccupiedRooms = async () => {
    try {
      const hotelRef = doc(collection(db, 'hotelList', 'Tlemcen', 'hotels'), email);
      const hotelDoc = await getDoc(hotelRef);

      if (hotelDoc.exists()) {
        const reservationData = hotelDoc.data().reservation;
        const checkInsCount = reservationData.filter(entry => entry['checkInDate']).length;
        const occupiedRoomsCount = checkInsCount ;
        setOccupiedRooms(occupiedRoomsCount);
      } else {
        console.log('Document does not exist');
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };
  if (email) {
    calculateOccupiedRooms();
  }

  }, [email]);
  */
  return (
    
    <div className=' container mx-auto font-poppins'>
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
      <div className='mb-20 shadow rounded-xl'>
        {/* the date */}
        <div className='text-center font-semibold text-xl my-10'>
              {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: '2-digit', year: 'numeric' })}
            </div>
            {/* Overview */}
            <div className='bg-white rounded-xl px-10 py-4'>
              <h2 className='text-3xl font-semibold mb-10'>Overview</h2>
              <div className='flex justify-between items-center'>
                {/* Check In */}
                <div className='flex justify-center items-start gap-3'>
                  {/* text */}
                  <div className='flex flex-col justify-center items-start'>
                    <span className='text-base text-gray-400'>Todays</span>
                    <span className='text-xl text-black'>Check-in</span>
                  </div>
                  {/* Number */}
                  <div className='text-mainColor text-[38px] font-semibold'>23</div>
                </div>
                {/* Check Out */}
                <div className='flex justify-center items-start gap-3'>
                  {/* text */}
                  <div className='flex flex-col justify-center items-start'>
                    <span className='text-base text-gray-400'>Todays</span>
                    <span className='text-xl text-black'>Check-out</span>
                  </div>
                  {/* Number */}
                  <div className='text-mainColor text-[38px] font-semibold'>13</div>
                </div>
                {/* In Hotel */}
                <div className='flex justify-center items-start gap-3'>
                  {/* text */}
                  <div className='flex flex-col justify-center items-start'>
                    <span className='text-base text-gray-400'>Total</span>
                    <span className='text-xl text-black'>In hotel</span>
                  </div>
                  {/* Number */}
                  <div className='text-mainColor text-[38px] font-semibold'>60</div>
                </div>
                {/* Total Available Room */}
                <div className='flex justify-center items-start gap-3'>
                  {/* text */}
                  <div className='flex flex-col justify-center items-start'>
                    <span className='text-base text-gray-400'>Total</span>
                    <span className='text-xl text-black'>Available room</span>
                  </div>
                  {/* Number */}
                  <div className='text-mainColor text-[38px] font-semibold'>10</div>
                </div>
                {/* Total Occupied Room */}
                <div className='flex justify-center items-start gap-3'>
                  {/* text */}
                  <div className='flex flex-col justify-center items-start'>
                    <span className='text-base text-gray-400'>Total</span>
                    <span className='text-xl text-black'>Occupied room</span>
                  </div>
                  {/* Number */}
                  <div className='text-mainColor text-[38px] font-semibold'>90</div>
                </div>
              </div>
            </div>
      </div>
    
    
      <div className="datatable">
        <div className="datatableTitle">
          vew all Users
          <Link state={{email: hotelEmail}} to="/secreter/new-user" className="link">
            Add New
          </Link>
        </div>
        {/* Last Users Table */}
        <div className="overflow-x-auto ">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <th>Name</th>
                  <th>email</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Total Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                  {reservationUsers.map((reservationUser) => (
                    <tr key={reservationUser.email}>
                      <td>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={profileAvatar} alt="Avatar Tailwind CSS Component" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{reservationUser.fullName}</div>
                            <div className="text-sm opacity-50">{reservationUser.country}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {reservationUser.email}
                        <br />
                      </td>
                      <td>{reservationUser.checkInDate?.toDate().toLocaleDateString()}</td>
                      <td>{reservationUser.checkOutDate?.toDate().toLocaleDateString()}</td>
                      <td>{reservationUser.totalPrice}</td>
                      <td>
                        <button className="btn btn-ghost btn-xs">details</button>
                      </td>
                    </tr>
                  ))}
              </tbody>

              
            </table>
          </div>
      </div>
  </div>
  )
}

export default Secretaire