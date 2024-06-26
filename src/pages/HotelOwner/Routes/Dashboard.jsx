import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useContext, useEffect, useState } from "react";
import { hotelTotalRevenue } from "../../../Data/HotelOwnerData";
import { db } from "../../../Data/Firebase";
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { AuthContext } from "../../../context/AuthContext";
import HotelRevenue from "../Data/HotelRevenue";

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
      
      

    






  const { currentUser } = useContext(AuthContext);
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








/*
  const [doublePrice, setDoublePrice] = useState(null);
  const [familyPrice, setFamilyPrice] = useState(null);
  const [standardPrice, setStandardPrice] = useState(null);
  const [suitePrice, setSuitePrice] = useState(null);

  const [doubleTotal, setDoubleTotal] = useState(null);
  const [familyTotal, setFamilyTotal] = useState(null);
  const [standardTotal, setStandardTotal] = useState(null);
  const [suiteTotal, setSuiteTotal] = useState(null);

  useEffect(() => {
    const fetchPriceRoomData = async () => {
      try {
        const hotelRef = doc(collection(db, 'hotelList', 'Tlemcen', 'hotels'), email);
        const hotelDoc = await getDoc(hotelRef);

        if (hotelDoc.exists()) {
          const priceroomData = hotelDoc.data().roomType;
          setDoublePrice(priceroomData.double?.price);
          setFamilyPrice(priceroomData.familly?.price);
          setStandardPrice(priceroomData.standard?.price);
          setSuitePrice(priceroomData.suite?.price);

          const totalRooms = hotelDoc.data().roomType;
          setDoubleTotal(totalRooms.double?.total_rooms);
          setFamilyTotal(totalRooms.familly?.total_rooms);
          setStandardTotal(totalRooms.standard?.total_rooms);
          setSuiteTotal(totalRooms.suite?.total_rooms);

        } else {
          console.log('Document does not exist');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };
if(email){
    fetchPriceRoomData();
}
  }, [email]);
*/
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
 
  

  
/*
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const hotelRef = doc(db, 'hotelList', 'Tlemcen', 'hotels', email );
        const hotelDoc = await getDoc(hotelRef);

        if (hotelDoc.exists()) {
          const roomTypesData = hotelDoc.data().roomType;
          setRoomTypes(Object.values(roomTypesData));
        } else {
          console.log("Hotel document not found for the current user");
        }
      } catch (error) {
        console.error('Error fetching room types:', error);
      }
    };

    if (email) {
      fetchRoomTypes();
    }
  }, [email]);



*/

const [roomTypes, setRoomTypes] = useState([]);



useEffect(() => {
  const fetchRoomTypes = async () => {
    try {
      const hotelRef = doc(db, 'hotelList', 'Tlemcen', 'hotels', email);
      const hotelDoc = await getDoc(hotelRef);

      if (hotelDoc.exists()) {
        const roomTypeData = hotelDoc.data().roomType;
        const roomTypesArray = [];
        for (const roomTypeName in roomTypeData) {
          const roomType = roomTypeData[roomTypeName];
         
          roomTypesArray.push({
            name: roomTypeName,
            price: roomType.price,
            TotalRoom:roomType.total_rooms
          });
        }
        setRoomTypes(roomTypesArray);
      }
    } catch (error) {
      console.error('Error fetching room types:', error);
    }
  };

  fetchRoomTypes();
}, [email]);



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
                  <div className='text-mainColor text-[38px] font-semibold'>{checkIns}</div>
                </div>
                {/* Check Out */}
                <div className='flex justify-center items-start gap-3'>
                  {/* text */}
                  <div className='flex flex-col justify-center items-start'>
                    <span className='text-base text-gray-400'>Todays</span>
                    <span className='text-xl text-black'>Check-out</span>
                  </div>
                  {/* Number */}
                  <div className='text-mainColor text-[38px] font-semibold'>{checkOuts}</div>
                </div>
                {/* In Hotel */}
                <div className='flex justify-center items-start gap-3'>
                  {/* text */}
                  <div className='flex flex-col justify-center items-start'>
                    <span className='text-base text-gray-400'>Total</span>
                    <span className='text-xl text-black'>In hotel</span>
                  </div>
                  {/* Number */}
                  <div className='text-mainColor text-[38px] font-semibold'>{totalRooms}</div>
                </div>
                {/* Total Available Room */}
                <div className='flex justify-center items-start gap-3'>
                  {/* text */}
                  <div className='flex flex-col justify-center items-start'>
                    <span className='text-base text-gray-400'>Total</span>
                    <span className='text-xl text-black'>Available room</span>
                  </div>
                  {/* Number */}
                  <div className='text-mainColor text-[38px] font-semibold'>{availableRooms}</div>
                </div>
                {/* Total Occupied Room */}
                <div className='flex justify-center items-start gap-3'>
                  {/* text */}
                  <div className='flex flex-col justify-center items-start'>
                    <span className='text-base text-gray-400'>Total</span>
                    <span className='text-xl text-black'>Occupied room</span>
                  </div>
                  {/* Number */}
                  <div className='text-mainColor text-[38px] font-semibold'>{occupiedRooms}</div>
                </div>
              </div>
            </div>
            {/* Rooms */}
            <div className='bg-white rounded-xl px-10 py-4 mt-12'>
              <h2 className='text-3xl font-semibold mb-10'>Rooms</h2>
              <div className='flex space-x-32 items-center'>
              {roomTypes.map(roomType => (
            <div key={roomType.name} className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
              <span className='bg-green-500 text-green-800 w-fit px-2 rounded-lg'>2 Deals</span>
              <h2 className="card-title mt-3 mb-2">{roomType.name}</h2>
              <span className='text-xl font-medium text-gray-700'><span className='text-2xl font-semibold'>{roomType.TotalRoom}</span>/{totalRooms}</span>
              <div className='text-base font-medium'><span className='text-mainColor font-bold text-3xl mt-3'>{roomType.price}</span>/day</div>
            </div>
          ))}
                
              </div>
            </div>
            {/* Total Revenue */}
            <div className="w-full mt-10">
    <h2 className='text-3xl font-semibold mb-10'>Total Revenue</h2>
    {email && <HotelRevenue hotelEmail={email} />}
</div>

      </div>
  )
}

export default Dashboard