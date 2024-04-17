
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useState } from "react";
import { hotelTotalRevenue } from "../../../Data/HotelOwnerData";

function Dashboard() {
    const [revenue, setRevenue] = useState({
        labels: hotelTotalRevenue.map((data) => data.month),
        datasets: [{
          label: 'Total Hotel Revenue',
          data: hotelTotalRevenue.map((data) => data.revenue),
          fill: true,
          borderColor: '#1b60e0',
          borderWidth: 5,
          tension: 0.4,
          pointBackgroundColor: 'purple',
          pointBorderWidth: 13
        }]
      }
      );
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
      <div className='bg-[#F8F8F8] w-full p-5'>
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
            {/* Rooms */}
            <div className='bg-white rounded-xl px-10 py-4 mt-12'>
              <h2 className='text-3xl font-semibold mb-10'>Rooms</h2>
              <div className='flex justify-between items-center'>
                {/* Single Sharing */}
                <div className="card w-fit bg-base-100 shadow-xl px-16 py-7">
                  <span className='bg-green-500 text-green-800 w-fit px-2 rounded-lg'>2 Deals</span>
                    <h2 className="card-title mt-3 mb-2">Single Sharing</h2>
                    <span className='text-xl font-medium text-gray-700'><span className='text-2xl font-semibold'>2</span>/30</span>
                    <div className='text-base font-medium'><span className='text-mainColor font-bold text-3xl mt-3'>$568</span>/day</div>
                </div>
                {/* Single Sharing */}
                <div className="card w-fit bg-base-100 shadow-xl px-16 py-7">
                  <span className='bg-green-500 text-green-800 w-fit px-2 rounded-lg'>2 Deals</span>
                    <h2 className="card-title mt-3 mb-2">Single Sharing</h2>
                    <span className='text-xl font-medium text-gray-700'><span className='text-2xl font-semibold'>2</span>/30</span>
                    <div className='text-base font-medium'><span className='text-mainColor font-bold text-3xl mt-3'>$568</span>/day</div>
                </div>
                {/* Single Sharing */}
                <div className="card w-fit bg-base-100 shadow-xl px-20 py-7">
                  <span className='bg-green-500 text-green-800 w-fit px-2 rounded-lg'>2 Deals</span>
                    <h2 className="card-title mt-3 mb-2">Single Sharing</h2>
                    <span className='text-xl font-medium text-gray-700'><span className='text-2xl font-semibold'>2</span>/30</span>
                    <div className='text-base font-medium'><span className='text-mainColor font-bold text-3xl mt-3'>$568</span>/day</div>
                </div>
                {/* Single Sharing */}
                <div className="card w-fit bg-base-100 shadow-xl px-16 py-7">
                  <span className='bg-green-500 text-green-800 w-fit px-2 rounded-lg'>2 Deals</span>
                    <h2 className="card-title mt-3 mb-2">Single Sharing</h2>
                    <span className='text-xl font-medium text-gray-700'><span className='text-2xl font-semibold'>2</span>/30</span>
                    <div className='text-base font-medium'><span className='text-mainColor font-bold text-3xl mt-3'>$568</span>/day</div>
                </div>
              </div>
            </div>
            {/* Total Revenue */}
            <div className="w-full mt-10">
            <h2 className='text-3xl font-semibold mb-10'>Total Revenue</h2>
                    <Line style={{width:"98%"}} data={revenue} options={options}/>
            </div>
          </div>
  )
}

export default Dashboard
