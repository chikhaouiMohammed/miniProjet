import { useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore"; 
import { db } from '../../Data/Firebase'
import { AuthContext } from "../../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

const NewUser = () => {
  const { currentUser } = useContext(AuthContext);
  const userEmail = currentUser.email;
  const { dispatch } = useContext(AuthContext);
  const { state } = useLocation()
  const [hotelData, setHotelData] = useState({});
  const [roomCounts, setRoomCounts] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [hotelImages, setHotelImages] = useState({});
  const hotelName = hotelData.name
  const hotelEmail = state.email

  console.log(hotelImages)

  // Increment room count
  const incrementRoomCount = (roomName) => {
    setRoomCounts((prevCounts) => ({
      ...prevCounts,
      [roomName]: (prevCounts[roomName] || 0) + 1,
    }));
  };

  // Decrement room count
  const decrementRoomCount = (roomName) => {
    setRoomCounts((prevCounts) => ({
      ...prevCounts,
      [roomName]: Math.max((prevCounts[roomName] || 0) - 1, 0),
    }));
  };

  // Calculate total price based on room counts
  useEffect(() => {
    const totalPrice = calculateTotalPrice();
    setTotalPrice(totalPrice);
    updateSelectedRooms();
  }, [roomCounts, hotelData]);


  const updateSelectedRooms = () => {
    if (typeof hotelData.roomType === 'object' && Object.keys(hotelData.roomType).length > 0) {
      const selectedRooms = Object.keys(roomCounts)
        .filter((roomName) => roomCounts[roomName] > 0)
        .map((roomName) => ({
          name: roomName,
          price: hotelData.roomType[roomName].price,
          count: roomCounts[roomName],
        }));
      setRooms(selectedRooms);
    }
  };
  
  

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    // Check if hotelData.roomType is an object
    if (typeof hotelData.roomType === 'object' && Object.keys(hotelData.roomType).length > 0) {
      Object.keys(roomCounts).forEach((roomName) => {
        const roomCount = roomCounts[roomName];
        const room = hotelData.roomType[roomName]; // Access room directly using roomName
        if (room) {
          totalPrice += room.price * roomCount;
        }
      });
    }
    return totalPrice;
  };

  useEffect(() => {
    const fetchHotelData = async () => {
    try {
        const hotelRef = doc(db, 'hotelList', 'Tlemcen', 'hotels', hotelEmail);
        const hotelSnap = await getDoc(hotelRef);
        const data = hotelSnap.data();
        setHotelData(data);
        if (data && data.roomType) {
            setRooms(Object.keys(data.roomType));
        }
        
        // Fetch hotel images and set them in state
        const images = data && data.HotelImages['Internal&External'] ? data.HotelImages['Internal&External'] : []; // Assuming images are stored in 'images' field
        setHotelImages(images);

        dispatch({ type: 'LOGIN', payload: { user: currentUser, role: 'guest', email: currentUser.email } });
    } catch (error) {
        console.error('Error fetching hotel data:', error);
    }
};


    fetchHotelData();
  }, [hotelEmail]);

  
  const [anchorEl, setAnchorEl] = useState(null);
      
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  

  return (
    <div className="bg-white py-32 flex flex-col gap-10  justify-center items-center w-full h-full ">
      {/* Rooms */}
      <div className="w-full flex justify-center items-center gap-8">
              {/* Room cards */}
              {hotelData && hotelData.roomType && Object.values(hotelData.roomType).map((room, index) => (
                <div key={index} className="card w-96 bg-base-100 shadow-xl">
                  <figure className='w-[384px] h-[256px]'><img className='w-full h-full' src={room.images[0]} alt="Room" /></figure>
                  <div className="card-body">
                    <h2 className="card-title">{room.name}</h2>
                    <p>Price: <span className='text-mainColor text-xl'>{room.price}</span></p>
                    <div className="card-actions flex justify-between items-center">
                      <button onClick={() => decrementRoomCount(room.name)} className="btn btn-outline btn-error">-</button>
                      <span>{roomCounts[room.name] || 0}</span>
                      <button onClick={() => incrementRoomCount(room.name)} className="btn btn-outline btn-accent">+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Display total price */}
            <div className='font-semibold text-center my-5 w-full'>Total Price: {totalPrice}</div>
            {totalPrice && <Link to="/payment" state={{ email: userEmail, price: totalPrice, rooms: rooms, bool: true, hotelEmail: hotelEmail, images: hotelImages, hotelName: hotelName }} className=" py-4 px-7 rounded-lg hover:bg-white hover:text-mainColor hover:border-[1px] hover:border-mainColor hover:border-solid transition-all duration-300 flex justify-center items-center w-fit bg-mainColor text-white">Buy Now</Link>}
    </div>
  )
}

export default NewUser;
