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
const Secretaire = () => {

  const { currentUser } = useContext(AuthContext);
  const [hotelEmail, setHotelEmail] = useState('');
  const [data, setData] = useState({});
  const [reservationUsers, setReservationUsers] = useState([])

  const tlemcenDocRef = doc(collection(db, "hotelList"), "Tlemcen");

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
    
 


  return (
    
    <div className=' container mx-auto font-poppins'>
      <header className='w-full px-[100px] py-[20px] flex justify-between items-center mb-[100px]'>
              <div className="navbar bg-transparent">
                  <div className="flex-1">
                      <a className="btn btn-ghost text-xl">StayDz</a>
                  </div>
                  <div className="flex-none gap-2">
                      <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                          <div className="w-10 rounded-full">
                          <img alt="Tailwind CSS Navbar component" src="https:daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
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
    <div className='flex justify-between space-x-20 mb-40'>
      <div className="featured h-[80px] w-[150px] ">
        <div className="top">
          <h1 className="title">Total Revenue</h1>
          <MoreVertIcon fontSize="small" />
        </div>
        <div className="bottom">
          <div className="featuredChart">
            <CircularProgressbar value={70} text={"70%"} strokeWidth={10} />
          </div>
          <p className="title">Total sales made today</p>
          <p className="amount">$420</p>
          <p className="desc">
            Previous transactions processing. Last payments may not be included.
          </p>
          <div className="summary">
            <div className="item">
              <div className="itemTitle">Today</div>
              <div className="itemResult negative">
                <KeyboardArrowDownIcon fontSize="small"/>
                <div className="resultAmount">$12.4k</div>
              </div>
            </div>
            <div className="item">
              <div className="itemTitle">Last Week</div>
              <div className="itemResult positive">
                <KeyboardArrowUpOutlinedIcon fontSize="small"/>
                <div className="resultAmount">$12.4k</div>
              </div>
            </div>
            <div className="item">
              <div className="itemTitle">Last Month</div>
              <div className="itemResult positive">
                <KeyboardArrowUpOutlinedIcon fontSize="small"/>
                <div className="resultAmount">$12.4k</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='shadow'>
        <div className='flex items-start mb-5'>
        <h1 className='text-2xl font-semibold'>Room Status</h1>
        </div>
        <div className='flex justify-between space-x-12'>
        <div className='flex flex-col gap-5'>
        <div className='flex justify-between space-x-12'>
        <h2 className='text-base font-normal'>Available room</h2>
        <span className='text-base font-light text-slate-600'>104</span>
        </div>
      <div className='flex justify-between'>
      <h2 className='text-base font-normal'>Single Sharing</h2>
      <span className='text-base font-light text-slate-600'>104</span>
      </div>
      <div className='flex justify-between'>
      <h2 className='text-base font-normal'>Double Sharing</h2>
      <span className='text-base font-light text-slate-600'>104</span>
      </div>
      <div className='flex justify-between'>
      <h2 className='text-base font-normal'>Triple Sharing</h2>
      <span className='text-base font-light text-slate-600'>104</span>
      </div>
      <div className='flex justify-between'>
      <h2 className='text-base font-normal'>Vip</h2>
      <span className='text-base font-light text-slate-600'>104</span>
      </div>
    </div>
    <div className='flex flex-col gap-5'>
        <div className='flex justify-between space-x-12'>
        <h2 className='text-base font-normal'>Occupied room </h2>
        <span className='text-base font-light text-slate-600'>104</span>
        </div>
      <div className='flex justify-between'>
        <h2 className='text-base font-normal'>Single sharing</h2>
        <span className='text-base font-light text-slate-600'>104</span>
      </div>
      <div className='flex justify-between'>
        <h2 className='text-base font-normal'>Double Sharing</h2>
        <span className='text-base font-light text-slate-600'>104</span>
      </div>
      <div className='flex justify-between'>
      <h2 className='text-base font-normal'>triple Sharing</h2>
      <span className='text-base font-light text-slate-600'>104</span>
      </div>
      <div className='flex justify-between'>
        <h2 className='text-base font-normal'>Vip</h2>
        <span className='text-base font-light text-slate-600'>104</span>
      </div>
    </div>
    </div>
    </div>
    </div>
    
      <div className="datatable">
        <div className="datatableTitle">
          vew all Users
          <Link to="/secreter/new-user" className="link">
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