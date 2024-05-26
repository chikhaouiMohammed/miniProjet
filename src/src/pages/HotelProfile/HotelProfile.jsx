import { useContext, useEffect, useState } from 'react';
import { ImageList, ImageListItem } from '@mui/material';
import { db } from '../../Data/Firebase';
import { getDoc, doc } from 'firebase/firestore';
import { Link, useLocation } from 'react-router-dom';
import { FaBusinessTime, FaFacebook, FaInstagram, FaParking, FaWifi } from 'react-icons/fa';
import { MdFreeBreakfast } from 'react-icons/md';
import { CgGym } from 'react-icons/cg';
import { FaXTwitter } from 'react-icons/fa6';
import { AuthContext } from '../../context/AuthContext';
import { Menu,MenuItem, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const HotelProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const userEmail = currentUser.email;
  const { dispatch } = useContext(AuthContext);
  let { state } = useLocation();
  const hotelEmail = state.email;
  const [hotelData, setHotelData] = useState({});
  const [IsArabic, setIsArabic] = useState(false);
  const [IsEnglish, setIsEnglish] = useState(true);
  const [IsFrench, setIsFrench] = useState(false);
  const [IsEspanol, setIsEspanol] = useState(false);
  const [roomCounts, setRoomCounts] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [hotelImages, setHotelImages] = useState({});
  const hotelName = hotelData.name

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

  useEffect(() => {
    if (hotelData && hotelData.language) {
      setIsArabic(hotelData.language.arabic || false);
      setIsEnglish(hotelData.language.english || true);
      setIsFrench(hotelData.language.french || false);
      setIsEspanol(hotelData.language.spanish || false);
    }
  }, [hotelData]);
  const [anchorEl, setAnchorEl] = useState(null);
      
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="font-poppins container mx-auto text-black">
      {/* Header */}
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
      <div className="px-[120px]">
        {/* Hotel Images */}
        <div className="mb-20">
          {hotelData && hotelData.HotelImages && hotelData.HotelImages['Internal&External'] && (
            <ImageList sx={{ width: '100%', height: 450 }} cols={3} rowHeight={164}>
              {hotelData.HotelImages['Internal&External'].map((imageUrl, index) => (
                <ImageListItem key={index}>
                  <img
                    src={imageUrl} // Use the imageUrl directly
                    alt={`Hotel Image ${index}`}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </div>
        {/* Hotel Details */}
        <div className="flex flex-col justify-center items-start gap-10">
          <h2 className="text-4xl font-bold">{hotelData ? hotelData.name : 'Loading...'}</h2>
          <div className="rating">
            {/* You can render the rating based on hotelData.rating */}
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" defaultChecked />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
          </div>
          {/* description */}
          <h3 className="text-3xl font-semibold">Description:</h3>
          <p className="font-normal text-xl">{hotelData ? hotelData.About : 'Loading...'}</p>
          {/* Policy */}
          <h3 className="text-3xl font-semibold">Policy:</h3>
          <p className="font-normal text-xl">{hotelData ? hotelData.Policy : 'Loading...'}</p>
          <div className="flex flex-col justify-center items-start gap-10">
            {/* Wilaya */}
            <div className="flex justify-center items-center gap-3">
              <h3 className="text-3xl font-semibold">Wilaya:</h3>
              <span className="font-normal text-xl">Tlemcen</span>
            </div>
            {/* Services */}
            <h3 className="text-3xl font-semibold">Services:</h3>
            <div className="flex flex-col justify-center items-start gap-3">
              <div className="flex justify-start items-center gap-3"><div><FaParking /></div><span>Parking</span></div>
              <div className="flex justify-start items-center gap-3"><div><FaWifi /></div><span>Free Wifi</span></div>
              <div className="flex justify-start items-center gap-3"><div><MdFreeBreakfast /></div><span>Breakfast</span></div>
              <div className="flex justify-start items-center gap-3"><div><CgGym /></div><span>Gym</span></div>
              <div className="flex justify-start items-center gap-3"><div><FaBusinessTime /></div><span>Business Facilities</span></div>
            </div>
            {/* Languages */}
            <h3 className="text-3xl font-semibold">Languages:</h3>
            <div className="flex flex-col justify-center items-start gap-3">
              <div className="flex justify-start items-center gap-3">
                {IsEnglish && <div>English</div>}
                {IsArabic && <div>Arabic</div>}
                {IsFrench && <div>French</div>}
                {IsEspanol && <div>Espanol</div>}
              </div>
            </div>
            {/* Social Media */}
            <h3 className="text-3xl font-semibold">Social Media:</h3>
            <div className="flex flex-col justify-center items-start gap-3">
              <div className="flex justify-start items-center gap-3">
                {hotelData.X_Link && 
                    <div>
                    <a href={hotelData.X_Link} target="_blank"><FaXTwitter style={{width:'30px', height:'30px', color:'#16243b'}} /></a>
                    </div>
                }
                {hotelData.facebook && 
                    <div>
                    <a href={hotelData.facebook} target="_blank"><FaFacebook style={{width:'30px', height:'30px', color:'#16243b'}} /></a>
                    </div>
                }
                {hotelData.instagrame && 
                    <div>
                    <a href={hotelData.instagrame} target="_blank"><FaInstagram style={{width:'30px', height:'30px', color:'#16243b'}} /></a>
                    </div>
                }
                
              </div>
            </div>
            <h3 className="text-3xl font-semibold">Phone Number:</h3>
            <div className='font-medium text-xl'>{hotelData.phone}</div>
            {/* Rooms */}
            <div className="w-full flex flex-wrap justify-between items-center gap-8">
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
          </div>
        </div>
      </div>
      {/* Display total price */}
      <div className='font-semibold text-center my-5 w-full'>Total Price: {totalPrice}</div>
      {totalPrice === 0 && <button className="absolute left-[45%] py-4 px-7 rounded-lg hover:bg-white hover:text-mainColor hover:border-[1px] hover:border-mainColor hover:border-solid transition-all duration-300 flex justify-center items-center w-fit bg-mainColor text-white">Buy Now</button>}
      {totalPrice && <Link to="/payment" state={{ email: userEmail, price: totalPrice, rooms: rooms, hotelEmail: hotelEmail, bool: true, images: hotelImages, hotelName: hotelName }} className="absolute left-[45%] py-4 px-7 rounded-lg hover:bg-white hover:text-mainColor hover:border-[1px] hover:border-mainColor hover:border-solid transition-all duration-300 flex justify-center items-center w-fit bg-mainColor text-white">Buy Now</Link>}
    </div>
  );
};

export default HotelProfile;




