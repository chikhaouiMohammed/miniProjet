import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React, { useState } from 'react';
import ReactCountryFlag from "react-country-flag"
import userImg from '../../images/Ellipse 437.png'
import './Secretaire.css'
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { DataGrid } from '@mui/x-data-grid';
import { userColumns } from "../../Data/datatablesource";
import { Link } from "react-router-dom";
import {collection,getDocs,deleteDoc,doc} from "firebase/firestore";
import { db } from "../../Data/Firebase";
const Secretaire = () => {

    const [language, setLanguage] = useState('EN');
    const [arrowStatus, setarrowStatus] = useState(false);

    const handleChange = (value) => {
        setLanguage(value);
    };
    const [data, setData] = useState([]);

    const handleDelete = async (id) => {
      try {
        await deleteDoc(doc(db, "users", id));
        setData(data.filter((item) => item.id !== id));
      } catch (err) {
        console.log(err);
      }
    };


    const actionColumn = [
      {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
          return (
            <div className="cellAction">
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row.id)}
              >
                Delete
              </div>
            </div>
          );
        },
      },
    ];
   const fetchData = async () => {
         let list = [];
         try {
           const querySnapshot = await getDocs(collection(db, "users"));
           querySnapshot.forEach((doc) => {
             list.push({ id: doc.id, ...doc.data() });
           });
           setData(list);
         console.log(list);
       } catch (err) {
          console.log(err);
        }
       };
       fetchData();

/*const fetchData = async () => {
  let list = [];
  try {
    // Fetch data from the "hotelliste/tlemcen/hotels" collection
    const querySnapshot = await getDocs(collection(db, "hotelliste", "tlemcen", "hotels"));
    querySnapshot.forEach((doc) => {
      // Access the reservation field inside each document
      const reservations = doc.data().reservation;
      // Push each reservation's user email to the list
      reservations.forEach((reservation) => {
        list.push(reservation.useremail);
      });
    });
    setData(list);
    console.log(list);
  } catch (err) {
    console.log(err);
  }
};
fetchData();
*/
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
    <div className='mb-20 shadow'>
      <div className='flex items-start mb-5'>
      <h1 className='text-2xl font-normal'>Overview</h1>
      </div>
      <div className='flex justify-between'>
      <div className='flex flex-col gap-5'>
        <h2 className='text-xl font-light text-slate-400'>Today's</h2>
        <p className='text-base font-medium text-slate-600'>check_in &nbsp;&nbsp;<span className=' font-medium text-3xl text-mainColor'>23</span></p>
      </div>
      <div className='flex flex-col gap-5'>
        <h2 className='text-xl font-light text-slate-400'>Today's</h2>
        <p className='text-base font-medium text-slate-600'>check_out &nbsp;&nbsp;<span className=' font-medium text-3xl text-mainColor'>13</span></p>
      </div>
      <div className='flex flex-col gap-5'>
        <h2 className='text-xl font-light text-slate-400'>Total</h2>
        <p className='text-base font-medium text-slate-600'>in Hotel &nbsp;&nbsp;<span className=' font-medium text-3xl text-mainColor'>60</span></p>
      </div>
      <div className='flex flex-col gap-5'>
        <h2 className='text-xl font-light text-slate-400'>Total</h2>
        <p className='text-base font-medium text-slate-600'>Available room &nbsp;&nbsp;<span className=' font-medium text-3xl text-mainColor'>10</span></p>
      </div>
      <div className='flex flex-col gap-5'>
        <h2 className='text-xl font-light text-slate-400'>Total</h2>
        <p className='text-base font-medium text-slate-600'>Occupied room &nbsp;&nbsp;<span className=' font-medium text-3xl text-mainColor'>30</span></p>
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
            <div className="itemTitle">Target</div>
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
        <Link to="/Secretaire/NewUser" className="link">
    Add New
  </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  </div>
  )
}

export default Secretaire