
import { useContext, useState } from 'react';
import userImg from '../../images/Ellipse 437.png'
import LinearProgress from '@mui/material/LinearProgress';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import  './Payment.css'
import iconCofee from '../../icons/Foods/tea-drink.png'
import iconwifi from '../../icons/Wifi/Wifi.png'
import parkingicon from '../../icons/Travels/parking.png'
import caticon from '../../icons/Animals/cat.png'
import  vecticon from '../../icons/Character/Vector.png'
import handleicon from '../../icons/Game/handle-x.png'
import bascketicon from '../../icons/Sports/play-basketball.png'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import EditIcon from '@mui/icons-material/Edit';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../Data/Firebase';
import { Menu,MenuItem, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
function Payment() {
    const [cardDetails, setCardDetails] = useState({});
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [fullName, setfullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setcountry] = useState('');
    const navigate = useNavigate();
    const { state } = useLocation()
    const userEmail = state.email
    const totalPrice = state.price
    const hotelEmail = state.hotelEmail
    const roomType = state.rooms
    const fromGuest = state.bool
    const hotelImages = state.images
    const hotelName = state.hotelName
    
    

    const handleCheckInDateChange = (date) => {
        setCheckInDate(date);
      };
    
      const handleCheckOutDateChange = (date) => {
        setCheckOutDate(date);
      };

  const handleCardDetails = (e) => {
    const { name, value } = e.target;
    setCardDetails(prevState => ({
        ...prevState,
        [name]: value
    }));
    console.log(cardDetails)
}

const handleAddReservation = async () => {
    if (fromGuest) {
        if (fullName && email && phone && country && checkInDate && checkOutDate && cardDetails) {
            try {
                const reservationDb = {
                    fullName,
                    email,
                    hotelEmail,
                    phone,
                    checkInDate: checkInDate.$d,
                    checkOutDate: checkOutDate.$d,
                    country,
                    roomType,
                    totalPrice,
                    cardDetails
                };
                

                const hotelDocRef = doc(collection(db, "hotelList", "Tlemcen", "hotels"), hotelEmail);
                const hotelDocSnap = await getDoc(hotelDocRef);

                if (hotelDocSnap.exists()) {
                    const hotelData = hotelDocSnap.data();
                    
                    if (hotelData.reservation) {
                        // If the reservation array exists, add the new reservation to it
                        await updateDoc(hotelDocRef, {
                            reservation: [...hotelData.reservation, reservationDb]
                        });
                    } else {
                        // If the reservation array doesn't exist yet, create a new one with the reservation
                        await setDoc(hotelDocRef, { reservation: [reservationDb] }, { merge: true });
                    }
                    
                    navigate('/payment/invoice', {state: {hotelName: hotelName, checkInDate: checkInDate,checkOutDate : checkOutDate, rooms: roomType, fullName: fullName, phone: phone, country: country,cardDetails: cardDetails, totalPrice: totalPrice }})
                } else {
                    console.error("Hotel document does not exist!");
                }
            } catch(error) {
                console.error("Error adding reservation:", error);
            }
        } else {
            console.error("Please fill in all required fields.");
            // Optionally, display an error message or take other actions
        }
    } else {
        console.error("User is not from a guest. Reservation not allowed.");
        // Optionally, display an error message or take other actions
    }
};
const [anchorEl, setAnchorEl] = useState(null);
      
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};
return (
<div className=' container mx-auto font-poppins'>
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

      {/* payment page content */}
        <div className='flex justify-end gap-[20%] items-center  flex-nowrap  pb-40'>
        {/* left side */}
        <div className='flex flex-col justify-center items-center '>
            {/* Hotel images & info */}
            <div className='flex justify-center items-start gap-4'>
                {/* images */}
                
                    <div className='flex flex-col justify-center items-start gap-8'>
                        {hotelImages.slice(0, 4).map((image, index) => (
                            <div key={index} className='rounded-xl overflow-hidden w-[142px] h-[120px] cursor-pointer'>
                                <img className='w-full h-full' src={image} alt={`Image ${index}`} />
                            </div>
                        ))}


                    </div>
                
                {/* Info */}
                <div className='flex flex-col items-start justify-center' >
                    {/* headingg */}
                    
                    <div className='text-black mb-4'>
                        <h2 className='text-2xl font-bold'>
                                    {roomType.map((roomName) => {
                                return <span key={roomName.id}>{roomName.name} room, </span>;
                            })}
                         </h2>
                        <span className='text-[#565656] text-sm'>Modern Hotel at Gothenburg Central Station</span>
                    </div>
                    
                    {/* Reviews Progress */}
                    <div className='flex flex-col justify-center items-start gap-2 mb-7 '>
                        <div className='w-full flex justify-between items-center'>
                            <h4 className='text-xl'>More than 4,325 Review</h4>
                            <div className='text-mainColor px-1 py-1 border-2 border-mainColor border-solid rounded-lg font-bold'>9.2</div>
                        </div>
                        <div className='w-full h-2 rounded-lg overflow-hidden'>
                            <LinearProgress variant="determinate" value={90} sx={{
                                                                                    width: '100%',
                                                                                    height: '100%',
                                                                                    '& .MuiLinearProgress-barColorPrimary': {
                                                                                    backgroundColor: '#FF432A', // This will change the color of the progress bar
                                                                                    },
                                                                                }} />
                        </div>
                    </div>
                    {/* Location information */}
                    <div className='mb-6'>
                        <div className='flex justify-start items-center gap-3'>
                            <div><LocationOnIcon fontSize='large' sx={{color:'#FF432A'}}/></div>
                            <h3 className='text-2xl font-semibold'>Location Information</h3>
                        </div>
                        <div className='flex flex-col items-start gap-2 mt-5 ml-2 '>
                            <span className='text-[#565656] text-sm '>0 m to City Centre </span>
                            <span className='text-[#565656] text-sm '>24 km to Landvetter Airport</span>  
                            <span className='text-[#565656] text-sm '>2,5 km to Liseberg Amusment Park</span> 
                            <span className='text-[#565656] text-sm '>0 m to Gothenburg Central Station</span>
                        </div>
                    </div>
                    {/* Services*/}
                    <div className='flex flex-col items-start gap-3  '>
                        <div className='flex items-center justify-center'>
                        <img src={iconCofee} alt="" className='w-[24px] h-[24px]'  />
                        <span className='text-[#565656] text-sm ml-2'>Breakfast Included</span>
                        </div>
                        <div className='flex items-center justify-center'>
                        <img src={iconwifi} alt="" className='w-[24px] h-[24px]'  />
                        <span className='text-[#565656] text-sm ml-2'>Free WI-FI</span>
                        </div>
                        <div className='flex items-center justify-center'>
                        <img src={parkingicon} alt="" className='w-[24px] h-[24px]'  />
                        <span className='text-[#565656] text-sm ml-2'>Free Parking</span>
                        </div>
                        <div className='flex items-center justify-center'>
                        <img src={caticon} alt="" className='w-[24px] h-[24px]'  />
                        <span className='text-[#565656] text-sm ml-2'>Pets are Welcome</span>
                        </div>
                        <div className='flex items-center justify-center'>
                        <img src={vecticon} alt="" className='w-[24px] h-[24px]'  />
                        <span className='text-[#565656] text-sm ml-2'>free laundry service</span>
                        </div>
                        <div className='flex items-center justify-center'>
                        <img src={handleicon} alt="" className='w-[24px] h-[24px]'  />
                        <span className='text-[#565656] text-sm ml-2'>no smoking</span>
                        </div>
                        <div className='flex items-center justify-center'>
                        <img src={bascketicon} alt="" className='w-[24px] h-[24px]'  />
                        <span className='text-[#565656] text-sm ml-2'>Free Entrance Exercise Centre</span>
                        </div>
                    </div>
                    {/*bookin details*/}
                    <div className='flex items-start ml-[-160px]'>
                    <div className='flex flex-col justify-center items-start mt-10 '>
                        <h2 className=' text-xl font-bold'>Your Booking Deteiels</h2>
                        <div className='flex items-start justify-between space-x-8 mt-4 gap-4  '>
                            <div className='flex flex-col items-start '>
                            <h3 className='text-base font-bold'> check in</h3>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker onChange={handleCheckInDateChange} />
                            </LocalizationProvider>
                            </div>
                            <div className='flex flex-col items-start '>
                            <h3 className='text-base font-bold'> check Out</h3>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker onChange={handleCheckOutDateChange} />
                            </LocalizationProvider>
                            </div>
                        </div>
                        <div className='flex flex-col items-start justify-start mt-6 gap-2 '>
                            <span className='text-[#565656] text-sm ml-2'>You Will Stay 4 Nights </span>
                            <span  className='text-[#565656] text-sm ml-2'>You Selected 2 Rooms For :</span>
                            <span  className='text-[#565656] text-sm ml-2'> 2 Adults</span>   
                            <span  className='text-[#565656] text-sm ml-2'> 3 Children</span>   
                        </div>
                    </div>
                    </div>
                    {/*payment*/}
                    <div className='flex flex-col items-start ml-[-160px]'>
                        <div className='mt-10 text-2xl font-bold '><h2>Payment information</h2></div>
                        
                        <div className='flex justify-between space-x-[100px] mt-8'>
                        <h4 className='text-base font-semibold'>Total Amount for Payment</h4>
                        <span className='text-2xl font-bold text-mainColor'>{totalPrice} DZD </span>
                        </div>
                    </div>
                    {/*Cancellation Policy */}
                    <div className='ml-[-160px]'>
                    <div className='flex flex-col items-start'>
                        <h3 className='text-2xl font-bold mt-10'>Cancellation Policy </h3>
                        <div>
                        <h2 className='text-base font-bold mt-4'>Free Cancellation</h2>
                        </div>
                        <p className='text-sm font-normal mt-4'>Cancel /Rebook No Later Than 24 Hours Before, Otherwise You Pay 80% Of The Cost.</p>
                    </div>
                    {/*Pay part now*/}
                    <div className='flex flex-col items-start '>
                        <div className='flex items-center justify-between space-x-[100px] '>
                            <h2 className='text-2xl font-bold mt-10 '>Pay part now, part later </h2>
                            <input type="radio" className='w-5 h-5 mt-8'/>
                        </div> 
                        <p className='text-sm font-normal mt-4'>Pay $ 200 now, and the rest ($6,60) will be automatically charged <br />
                            to the same payment method on August 27, 2023. No extra fees.</p>
                    </div>
                    </div>
                    {/*payment Methode  */}
                    <div className='ml-[-160px]'>
                        <div className='flex flex-col mt-10'>
                        <h2 className='text-2xl font-bold '>Payment Methode</h2>
                        <div className='flex justify-between mt-10'>
                            <div className='flex justify-between space-x-8'>
                                <h3 className='text-base font-bold'>Payment <br /> Methode</h3>
    <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
    <InputLabel id="demo-select-small-label"
    
    >Chose Methode</InputLabel>
    <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        
        label="Age"
        
    >
        <MenuItem value="">
        <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Wise</MenuItem>
        <MenuItem value={20}>Baridi Mop</MenuItem>
        <MenuItem value={30}>Paysera</MenuItem>
    </Select>
    </FormControl>
                            </div>
                            <div className='flex justify-between items-center space-x-2'>
                            <h3 className='text-base font-bold'>booking For Work</h3>
                            <input type="radio" className='w-5 h-5 '/>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* right side */}
        <div className='flex flex-col justify-center items-center  '>
            <div  className='flex justify-between gap-4 mt-8'>
                    <h4 className='font-bold text-base'>Who are you booking for?</h4>
                    <div className='flex justify-between items-center gap-1'>
                    <input type="radio"/>
                    <label htmlFor="" className='text-[10px] font-light'>I am the main guest</label>
                    </div>
                <div className='flex justify-between items-center gap-1'>
                <input type="radio"  />
                <label htmlFor="" className='text-[10px] font-light'>Booking is for someone else</label>
                </div>
                    
            </div>
            <div className='flex flex-col gap-3 mt-8'>
                <h2 className='text-2xl font-bold'>Entrer Your information</h2>
                <p className='text-[14px] font-normal'>Make Sure the Information that you Have already written in yoy Profile is Correct.</p>
            </div>
            
                <div className='flex justify-end mt-5'>
                <i><EditIcon/></i>
                <span className=' text-mainColor text-sm font-normal'>Edit Your Profil</span>
                </div>
                <div className='w-full flex justify-center items-start flex-col'>
                    <h3 className='font-bold text-2xl mt-8'>Full Name</h3>
                    <div className='flex items-center justify-start gap-4 mt-3 '>
                    <input id='fullName' type="text" value={fullName} placeholder='Full Name' onChange={(e)=>{setfullName(e.target.value)}} className=' rounded-sm border border-neutral-400 text-neutral-600 text-xs font-normal pl-2 pt-2 pb-2' required />

                    </div>
                    <div className='flex justify-between gap-4 mt-4'>
                        <div>
                        <h3 className='font-medium text-base'>Email Adress</h3>
                        <input id='email' type="email" value={email}  placeholder='your email ' onChange={(e)=>{setEmail(e.target.value)}} className='  rounded-sm border border-neutral-400 text-neutral-600 text-xs font-normal pl-2 pt-2 pb-2' required />
                        </div>
                        <div>
                            <h3 className='font-medium text-base'>phone number</h3>
                            <input type="text" name="" id="" placeholder='your phone number' onChange={(e) => setPhone(e.target.value)} className='  rounded-sm border border-neutral-400 text-neutral-600 text-xs font-normal pl-2 pt-2 pb-2' />
                        </div>
                    </div>
                    <div className='mt-7'>
                        <h3 className='font-bold text-2xl '>Your country</h3>
                        <h4 className='font-normal text-sm mt-2'>Choose your curent country :</h4>
                    </div>
                    <div className='mt-4'>
                        <h4 className='font-medium text-base mb-2'>country/Region</h4>
                        <input type="text" value={country} id="" placeholder='your country' onChange={(e) => setcountry(e.target.value)} className='  rounded-sm border border-neutral-400 text-neutral-600 text-xs font-normal pl-2 pt-2 pb-2' />
                    </div>
                    
                </div>
                <div  className='flex flex-col mt-10'>
                    <h3 className='font-bold text-2xl '>Add Your stay</h3>
                    <div className='flex justify-between mt-8'>
                        <input type="checkbox" name="" id="" className='w-5 h-5' />
                        <h4 className='font-semibold text-base '>Want to book a taxi or shuttle ride in advance? (YASSIR)</h4>
                    </div>
                    <div className=' mt-4'>
                    <DirectionsCarFilledOutlinedIcon/>
                    <span className='font-normal text-xs pl-2 '>10% Special Offer If You Rent A Taxi</span>
                    </div>
                    <p className='font-medium text-sm mt-4'>Avoid surprises_ get from the airport to your accommodation without a Hitch <br />
                    we will add taxi options to your booking confirmation.
                    </p>
                    
                </div>
                <div className='mt-10'>
                    <div className='flex flex-col gap-3 '>
                    <h2 className='font-semibold text-[16px] mb-3'>Special Requests</h2>
                    <p className='font-medium text-sm'>Special requests can not be guaranteed _ but the property will do its best to <br /> meet your needs. </p>
                    <p className='font-medium text-sm'>you can always make a special request after your booking is complete!</p>
                    </div>
                    <div className='flex flex-col gap-2 mt-5 '>
                        <h2 className='font-medium text-sm'>(optional)</h2>
                        <div className='relative flex items-center'>
                        <input type="text" name="" id="" className=' rounded-sm border border-neutral-400 text-neutral-600 w-[613px] h-[106px]' 
                        
                        />
                        <EditRoundedIcon className='absolute left-1'/>
                        </div>
                        <div className='mt-5 flex items-center '>
                            <input type="checkbox" name="" id="" className='w-5 h-5' />
                            <span className='font-medium text-sm pl-2'>I would like rooms close to each other</span>
                        </div>
                    </div>
                </div>
                <div className=' flex flex-col gap-3 mt-7'>
                    <h3 className='font-semibold text-base mb-3'>You Arrival time</h3>
                    <div className='flex items-center'>
                        <CheckCircleOutlineRoundedIcon/>
                        <span className='font-medium text-sm pl-2'>your rooms will be ready for check_in </span>
                    </div>
                    <div>
                        <AccessTimeRoundedIcon/>
                        <span className='font-medium text-sm pl-2'>24-huor front desk_Help wherever you need it!</span>
                    </div>
                </div>
                
                 {/* Bank card information */}
                <div className='flex flex-col mt-8'>
                    <h2 className='text-2xl font-bold'>Bank Card information</h2>
                    <div className='flex flex-col '>
                        <div className='flex justify-between gap-3 mt-3'>
                            <div>
                                <h3 className='font-medium text-base'>Full Name on the card</h3>
                                <input
                                    type="text"
                                    name="cardHolderName"
                                    value={cardDetails.cardHolderName || ''}
                                    onChange={handleCardDetails}
                                    placeholder='your name '
                                    className='rounded-sm border border-neutral-400 text-neutral-600 text-xs font-normal pl-2 pt-2 pb-2'
                                />
                            </div>
                            <div>
                                <h3 className='font-medium text-base'>Card number</h3>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    value={cardDetails.cardNumber || ''}
                                    onChange={handleCardDetails}
                                    placeholder='your card number'
                                    className='rounded-sm border border-neutral-400 text-neutral-600 text-xs font-normal pl-2 pt-2 pb-2'
                                />
                            </div>
                        </div>
                        <div className='flex justify-between gap-3 mt-3'>
                            <div>
                                <h3 className='font-medium text-base'>Exp date</h3>
                                <input
                                    type="text"
                                    name="expDate"
                                    value={cardDetails.expDate || ''}
                                    onChange={handleCardDetails}
                                    placeholder='**/** '
                                    className='rounded-sm border border-neutral-400 text-neutral-600 text-xs font-normal pl-2 pt-2 pb-2'
                                />
                            </div>
                            <div>
                                <h3 className='font-medium text-base'>Cvc</h3>
                                <input
                                    type="text"
                                    name="cvc"
                                    value={cardDetails.cvc || ''}
                                    onChange={handleCardDetails}
                                    placeholder='***'
                                    className='rounded-sm border border-neutral-400 text-neutral-600 text-xs font-normal pl-2 pt-2 pb-2'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-center gap-8 mt-5'>
                        <div className='relative flex items-center justify-center'>
                            <button className='bg-white rounded border border-mainColor flex justify-center items-center pt-3 pb-3 pl-4 pr-10 font-bold text-base text-mainColor'>Save in Shortcute</button>
                            <FavoriteBorderRoundedIcon className='absolute right-3 text-mainColor' />
                        </div>
                        <button className='bg-mainColor rounded flex justify-center items-center pt-3 pb-3 pl-12 pr-12 font-bold text-base text-white' onClick={handleAddReservation}>Payment</button>
                    </div>
                </div>
        </div>
    </div>
</div>
)
}

export default Payment
