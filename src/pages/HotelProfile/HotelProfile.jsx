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

const HotelProfile = () => {
  const { currentUser } = useContext(AuthContext)
  const userEmail = currentUser.email
  const { dispatch } = useContext(AuthContext);
  let { state } = useLocation()
  const hotelEmail = state.email  
  const [hotelData, setHotelData] = useState({});
  const [IsArabic, setIsArabic] = useState(false);
  const [IsEnglish, setIsEnglish] = useState(true);
  const [IsFrench, setIsFrench] = useState(false);
  const [IsEspanol, setIsEspanol] = useState(false);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const hotelRef = doc(db, "hotelList", "Tlemcen", "hotels", hotelEmail);
        const hotelSnap = await getDoc(hotelRef);
        setHotelData(hotelSnap.data());
        console.log(hotelSnap.data());
        dispatch({ type: "LOGIN", payload: { user: currentUser, role: "guest", email: currentUser.email } }); 
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
  

  

  return (
    <div className="font-poppins container mx-auto text-black">
      {/* Header */}
      <header className='w-full px-[100px] bg-transparent py-[20px] flex justify-between items-center'>
        <div className="navbar bg-transparent">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">StayDz</a>
          </div>
          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
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
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
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
                    <a href={hotelData.X_Link} target="_blank"><FaFacebook style={{width:'30px', height:'30px', color:'#16243b'}} /></a>
                    </div>
                }
                {hotelData.instagrame && 
                    <div>
                    <a href={hotelData.X_Link} target="_blank"><FaInstagram style={{width:'30px', height:'30px', color:'#16243b'}} /></a>
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
                    <div className="card-actions justify-end">
                        <Link to="/payment" state={{email: userEmail, price: room.price, roomName: room.name, hotelEmail: hotelEmail, bool: true}} className="btn btn-primary">Buy Now</Link>
                    </div>
                    </div>
                </div>
                ))}


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}  

export default HotelProfile;
