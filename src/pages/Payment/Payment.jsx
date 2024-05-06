
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useContext, useState } from 'react';
import ReactCountryFlag from "react-country-flag"
import userImg from '../../images/Ellipse 437.png'
import firstHotelImg from '../../images/Home/paymentPage/HotelImages/image 33.png'
import secondHotelImg from '../../images/Home/paymentPage/HotelImages/image 34.png'
import thirdHotelImg from '../../images/Home/paymentPage/HotelImages/image 35.png'
import fourthHotelImg from '../../images/Home/paymentPage/HotelImages/image 5.png'
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
import dayjs from 'dayjs';
import userImg2 from '../../images/Ellipse 437.png'
import EditIcon from '@mui/icons-material/Edit';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useReservation } from '../../context/ReservationDataContext';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../Data/Firebase';


function Payment() {
    const { currentUser } = useContext(AuthContext);
    const { reservation } = useReservation();
    const [cardDetails, setCardDetails] = useState({});
    const navigate = useNavigate();
    

  const handleCardDetails = (e) => {
    const { name, value } = e.target;
    setCardDetails(prevState => ({
        ...prevState,
        [name]: value
    }));
    console.log(cardDetails)
}
  
  const handlePayment = async () => {
    try {
      const hotelDocRef = doc(collection(db, "hotelList", "Tlemcen", "hotels"), reservation.hotelEmail);
      const hotelDocSnap = await getDoc(hotelDocRef);

      if (hotelDocSnap.exists()) {
        const hotelData = hotelDocSnap.data();
        
        const updatedReservation = hotelData.reservation.map(reservationItem => {
          if (
            reservationItem.fullName === reservation.fullName &&
            reservationItem.email === reservation.email
          ) {
            return { ...reservationItem, cardDetails: cardDetails };
          } else {
            return reservationItem;
          }
        });

        await updateDoc(hotelDocRef, { reservation: updatedReservation });

        navigate('/');
      } else {
        console.error("Hotel document does not exist!");
      }
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };


return (
<div className=' container mx-auto font-poppins'>
    <header className='py-[50px] flex justify-between items-center mb-[100px]'>
  {/* Logo */}
    <div className='text-xl font-bold cursor-pointer'>Logo</div>
  {/* nav */}
    <nav className='flex justify-center items-center gap-5'>
    {/* User Account */}
    <div className='flex justify-center items-center gap-4'>
      {/* user image */}
        <div className='w-[50px] h-[50px] overflow-hidden rounded-full cursor-pointer'><img className='w-full h-full' src={userImg} alt="" /></div>
      {/* info */}
        <div className='flex flex-col justify-center items-center gap-[1px] text-mainTextColor '>
        <h4 className='font-extrabold text-[16px]'>Your Account</h4>
        <span className='text-[14px]'>Nobody</span>
        </div>
    </div>
    </nav>
    </header>

      {/* payment page content */}
        <div className='flex justify-between items-center  flex-nowrap  '>
        {/* left side */}
        <div className='flex flex-col justify-center items-start '>
            {/* Hotel images & info */}
            <div className='flex justify-center items-start gap-4'>
                {/* images */}
                <div className='flex flex-col justify-center items-start gap-8'>
                    <div className='rounded-xl overflow-hidden w-[142px] h-[120px] cursor-pointer'><img className='w-full h-full' src={firstHotelImg} alt="" /></div>
                    <div className='rounded-xl overflow-hidden w-[142px] h-[120px] cursor-pointer'><img src={secondHotelImg} alt="" /></div>
                    <div className='rounded-xl overflow-hidden w-[142px] h-[120px] cursor-pointer'><img src={thirdHotelImg} alt="" /></div>
                    <div className='rounded-xl overflow-hidden w-[142px] h-[120px] cursor-pointer'><img src={fourthHotelImg} alt="" /></div>
                </div>
                {/* Info */}
                <div className='' >
                    {/* headingg */}
                    <div className='text-black mb-4'>
                        <h2 className='text-2xl font-bold'>First Hotel G</h2>
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
                                <DatePicker />
                            </LocalizationProvider>
                            </div>
                            <div className='flex flex-col items-start '>
                            <h3 className='text-base font-bold'> check Out</h3>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker />
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
                        
                        <div className='mt-8 text-xl font-bold'><h3>Your Price Summary</h3></div>
                        <div className='flex justify-between space-x-[190px] mt-8'>
                        <h4 className='text-base font-bold'>original price</h4>
                        <span className='text-base font-bold'>$960 &nbsp; <span className='text-base font-bold text-[#565656]'>4 night</span> </span>
                        </div>
                        <div className='flex justify-between space-x-[100px] mt-8'>
                        <h4 className='text-sm font-normal'>EasySet24 Loyalty Discount 4 %</h4>
                        <span className='text-sm font-normal text-mainColor'>$100 <span className='text-sm font-normal text-[#565656]'>Discount</span> </span>
                        </div>
                        <div className='flex justify-between space-x-[100px] mt-8'>
                        <h4 className='text-base font-semibold'>Total Amount for Payment</h4>
                        <span className='text-2xl font-bold text-mainColor'>11 111 DZD </span>
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
        <div className='flex flex-col justify-center items-start  '>
            <div className='flex justify-between gap-8'>
            <div className='flex justify-center items-center gap-4'>
                {/* user image */}
                <div className='w-[50px] h-[50px] overflow-hidden rounded-full cursor-pointer'><img className=' w-full h-full' src={userImg2} alt="" /></div>
                {/* info */}
                <div className='flex flex-col justify-center items-center gap-[1px] text-mainTextColor '>
                    <h4 className='font-extrabold text-[16px]'>Anna Carinna</h4>
                    <span className='text-[14px] '>easyset24@gmail.com</span>
                </div>
            </div>
            <div className='w-full h-full bg-white rounded border border-mainColor flex justify-center items-center '>
            <h3 className='text-mainColor text-base font-medium capitalize leading-snug pt-4 pb-4 pl-4 pr-4'> Check Your Booking Story</h3>
            </div>
            </div>
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
                <div>
                    <h3 className='font-bold text-2xl mt-8'>Full Name</h3>
                    <div className='flex items-center justify-start gap-4 mt-3 '>
                    <input type="text" value={reservation?.fullName || ''} placeholder='Full Name' className=' rounded-sm border border-neutral-400 text-neutral-600 text-xs font-normal pl-2 pt-2 pb-2' required />

                    </div>
                    <div className='flex justify-between gap-4 mt-4'>
                        <div>
                        <h3 className='font-medium text-base'>Email Adress</h3>
                        <input type="email" value={reservation.email} id="" placeholder='your email ' className='  rounded-sm border border-neutral-400 text-neutral-600 text-xs font-normal pl-2 pt-2 pb-2' />
                        </div>
                        <div>
                            <h3 className='font-medium text-base'>phone number</h3>
                            <input type="text" name="" id="" placeholder='your phone number' className='  rounded-sm border border-neutral-400 text-neutral-600 text-xs font-normal pl-2 pt-2 pb-2' />
                        </div>
                    </div>
                    <div className='mt-7'>
                        <h3 className='font-bold text-2xl '>Your country</h3>
                        <h4 className='font-normal text-sm mt-2'>Choose your curent country :</h4>
                    </div>
                    <div className='mt-4'>
                        <h4 className='font-medium text-base mb-2'>Country/Region</h4>
                        <input type="text" value={reservation.country} id="" placeholder='your country' className='  rounded-sm border border-neutral-400 text-neutral-600 text-xs font-normal pl-2 pt-2 pb-2' />
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
                        <span className='font-medium text-sm pl-2'>your rooms will be ready for check_in between 15:00 and 23:00</span>
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
                        <button className='bg-mainColor rounded flex justify-center items-center pt-3 pb-3 pl-12 pr-12 font-bold text-base text-white' onClick={handlePayment}>Payment</button>
                    </div>
                </div>
        </div>
    </div>
    </div>
)
}

export default Payment
