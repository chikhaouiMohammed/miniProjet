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
import { userColumns, userRows } from "../../Data/datatablesource";
const Secretaire = () => {

    const [language, setLanguage] = useState('EN');
    const [arrowStatus, setarrowStatus] = useState(false);

    const handleChange = (value) => {
        setLanguage(value);
    };
    const [data, setData] = useState(userRows);

    const handleDelete = (id) => {
      setData(data.filter((item) => item.id !== id));
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

  return (
    
    <div className=' container mx-auto font-poppins'>
      <header className='py-[50px] flex justify-between items-center mb-[100px]'>
      {/* Logo */}
      <div className=' text-xl font-bold cursor-pointer'>Logo</div>
      {/* nav */}
      <nav className='flex justify-center items-center gap-5'>
          {/* languages */}
          <div className="dropdown">
              <div onMouseEnter={()=>{setarrowStatus(true)}} onMouseOut={()=>{setarrowStatus(false)}}>
                  <button  className="dropbtn">{language}</button>
                  <div className="dropdown-content">
                      <div className=' flex justify-center items-center'>
                          <a onClick={() => handleChange("EN")} href="#">English</a>
                          <div className=' cursor-pointer' onClick={() => handleChange("EN")}> <ReactCountryFlag style={{width:"50px", height:"25px", borderRadius:"15px"}} countryCode="US" svg /></div>
                      </div>
                      <div className=' flex justify-center items-center'>
                          <a onClick={() => handleChange("FR")} href="#">French</a>
                          <div className=' cursor-pointer' onClick={() => handleChange("FR")}> <ReactCountryFlag style={{width:"50px", height:"25px", borderRadius:"15px"}} countryCode="FR" svg /></div>
                      </div>
                      <div className=' flex justify-center items-center'>
                          <a onClick={() => handleChange("AR")} href="#">Arabic</a>
                          <div className=' cursor-pointer' onClick={() => handleChange("AR")}> <ReactCountryFlag style={{width:"50px", height:"25px", borderRadius:"15px"}} countryCode="DZ" svg /></div>
                      </div>
                      
                  </div>
                  {arrowStatus ? <KeyboardArrowUpIcon sx={{ color: "#212832", cursor: "pointer" }} /> : <KeyboardArrowDownIcon sx={{ color: "#212832", cursor: "pointer" }} />}
              </div>
          </div>
          {/* User Account */}
          <div className='flex justify-center items-center gap-4'>
              {/* user image */}
              <div className='w-[50px] h-[50px] overflow-hidden rounded-full cursor-pointer'><img className=' w-full h-full' src={userImg} alt="" /></div>
              {/* info */}
              <div className='flex flex-col justify-center items-center gap-[1px] text-mainTextColor '>
                  <h4 className='font-extrabold text-[16px]'>Your Account</h4>
                  <span className='text-[14px]'>Nobody</span>
              </div>
          </div>
      </nav>
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
      <div className='link'>
        Add New
      </div>
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