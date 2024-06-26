import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import './hotelSearch.css'
import { Box, FormControlLabel, FormGroup , Rating, Slider } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import logo from "../../images/logo.png"
import { Menu,MenuItem, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Data/Firebase';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import imgHotel from '../../assets/44895548.c94c78db.640-1.jpg'
import imghotel1 from '../../assets/horizontal-tlemcen.jpg'
import imghotel2 from '../../assets/5014bf9705e597e4d1123f58b425eb5b_M.jpg'
import imghotel3 from '../../assets/tlemcene.jpg'
import ibisImg from '../../assets/exterior-view.jpg'
import renissenceImg from '../../assets/renaissance.jpg'
import zianidImg from '../../assets/zianides.webp'

const hotelCardsList = [
    ibisImg,
    renissenceImg,
    zianidImg
]



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const roomTypes = [
  'standard',
  'double',
  'familly',
  'suite'
];

const labels = {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
  };
  function getStyles(name, roomTypeFilter, theme) {
    return {
      fontWeight:
        roomTypeFilter.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }
function valuetext(value) {
return `${value}DA`;
}

function HotelSearch() {
    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [roomTypeFilter, setRoomTypeFilter] = useState([]);
    const [priceRange, setPriceRange] = useState([2000, 20000]);
    const [value, setValue] = useState(2); 
    const [hover, setHover] = useState(-1);
    const theme = useTheme(); 
    const [anchorEl, setAnchorEl] = useState(null);
      
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
      
        const handleClose = () => {
          setAnchorEl(null);
        };

    console.log(roomTypeFilter)
  
    useEffect(() => {
      async function fetchHotels() {
        try {
          const hotelsData = await getAllHotels();
          setHotels(hotelsData);
          setFilteredHotels(hotelsData);
        } catch (error) {
          console.error('Error fetching hotels:', error);
        }
      }
  
      fetchHotels();
    }, []);
  
    async function getAllHotels() {
      try {
        const hotels = [];
        const snapshot = await getDocs(collection(db, 'hotelList', 'Tlemcen', 'hotels'));
        snapshot.forEach((doc) => {
          const hotelData = doc.data();
          const hotel = {
            id: doc.id,
            name: hotelData.name,
            email: hotelData.email,
            rating: hotelData.rating,
            rooms: hotelData.roomType
              ? Object.entries(hotelData.roomType).map(([roomType, roomDetails]) => ({
                  type: roomType,
                  images: roomDetails.images,
                  price: roomDetails.price,
                  total_checkin: roomDetails.total_checkin,
                  total_checkout: roomDetails.total_checkout,
                  total_revenue: roomDetails.total_revenue,
                  total_rooms: roomDetails.total_rooms,
                }))
              : [],
          };
          hotels.push(hotel);
        });
        return hotels;
      } catch (error) {
        console.error('Error getting all hotels:', error);
        return [];
      }
    }
  
    useEffect(() => {
      filterHotels();
    }, [roomTypeFilter, priceRange, handleSearch]);
  
    const filterHotels = () => {
      let filtered = [...hotels];
  
      // Apply room type filter
      if (roomTypeFilter.length > 0) {
        filtered = filtered.filter((hotel) =>
          hotel.rooms.some((room) => roomTypeFilter.includes(room.type))
        );
      }
  
      // Apply price range filter
      filtered = filtered.filter(
        (hotel) =>
          hotel.rooms.some(
            (room) => room.price >= priceRange[0] && room.price <= priceRange[1]
          )
      );
  
      setFilteredHotels(filtered);
    };
  
    const handleRoomTypeChange = (event) => {
        const {
            target: { value },
          } = event;
          setRoomTypeFilter(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
          );
    };
  
    const handlePriceChange = (event, newValue) => {
      setPriceRange(newValue);
    };
    console.log(hotels)

    function handleSearch () {
        console.log("clicked")
    }

  return (
    <div className='font-poppins text-mainTextColor'>
            <header className="w-full h-[100px] overflow-hidden px-[100px] py-[20px] flex justify-between items-center mb-[74px] box-shadow">
                {/* Logo */}
                <div className='w-[250px] cursor-pointer'><img className='w-full h-full' src={logo} alt="" /></div>

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
            {/* Images Carousel */}
            <div className="carousel h-[500px] w-full">
                
                <div id="slide2" className="carousel-item relative w-full h-[500px]">
                    <img src={imghotel1} className="w-full h-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full h-[500px]">
                    <img src={imghotel2} className="w-full h-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide4" className="carousel-item relative w-full h-[500px]">
                    <img src={imghotel3} className="w-full h-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>
            <section className=" w-full container mx-auto pb-[63px]">
                {/* CheckIn & CheckOut and search info */}
                <div className='px-[24px] py-[32px] flex justify-center gap-5 items-center box-shadow'>

                    {/* Check In */}
                    <div className='w-[340px]'>
                        <Box sx={{ width: '100%' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker']}>
                                    <DateTimePicker label="Check in date" onChange={(date) => handleCheckInDateChange(date)} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Box>
                    </div>
                    {/* Check Out */}
                    <div className='w-[340px]'>
                        <Box sx={{ width: '100%' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker']}>
                                    <DateTimePicker label="Check out date" />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Box>
                    </div>
                    {/* Room Type */}
                    <div className='w-fit'>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-name-label">Room Type</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                value={roomTypeFilter}
                                onChange={handleRoomTypeChange}
                                input={<OutlinedInput label="Name" />}
                                MenuProps={MenuProps}
                            >
                                {roomTypes.map((roomType) => (
                                    <MenuItem
                                        key={roomType}
                                        value={roomType}
                                        style={getStyles(roomType, roomTypeFilter, theme)}
                                    >
                                        {roomType}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div onClick={handleSearch} className='bg-mainColor px-[16px] py-[14px] rounded-md cursor-pointer transition-all duration-300 hover:bg-transparent border-solid border-mainColor border-[2px] '><div className='text-black'><SearchIcon /></div></div>
                </div>
                {/* Hotels and filter  */}
                <div className=' w-full mt-10 flex justify-center items-start gap-5'>
                    {/* Filter */}
                    <div className='flex flex-col justify-center items-start'>
                        <h2 className='text-[28px] font-semibold mb-[32px] text-black'>Filters</h2>
                        <div className="collapse collapse-arrow bg-base-200">
                            <input type="radio" name="my-accordion-2" defaultChecked />
                            <div className="collapse-title text-xl font-medium">
                                Speaking Languages
                            </div>
                            <div className="collapse-content">
                                {/* Speaking Languages */}
                                <div className='flex flex-col justify-center items-start my-3'>

                                    <div>
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox defaultChecked />} label="English" />
                                            <FormControlLabel control={<Checkbox />} label="French" />
                                            <FormControlLabel control={<Checkbox />} label="Arabic" />
                                            <FormControlLabel control={<Checkbox />} label="ُEspanol" />
                                        </FormGroup>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow bg-base-200">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-xl font-medium">
                                Services
                            </div>
                            <div className="collapse-content">
                                {/* Services */}
                                <div className='flex flex-col justify-center items-start my-3'>

                                    <div>
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox defaultChecked />} label="Breakfast" />
                                            <FormControlLabel control={<Checkbox />} label="Parking" />
                                            <FormControlLabel control={<Checkbox />} label="Free WiFi" />
                                            <FormControlLabel control={<Checkbox />} label="Gym" />
                                            <FormControlLabel control={<Checkbox />} label="Business Facilities" />
                                        </FormGroup>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow bg-base-200">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-xl font-medium">
                                Rating
                            </div>
                            <div className="collapse-content">
                                {/* Rating */}
                                <div className='my-3'>
                                    <div>
                                        <Box
                                            sx={{
                                                width: 200,
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Rating
                                                name="hover-feedback"
                                                size='large'
                                                value={value} // Set value to the rating value
                                                getLabelText={getLabelText}
                                                onChange={(event, newValue) => {
                                                    setValue(newValue); // Update the rating value when changed
                                                }}
                                                onChangeActive={(event, newHover) => {
                                                    setHover(newHover);
                                                }}
                                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                            />
                                            {labels !== null && (
                                                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                                            )}
                                        </Box>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow bg-base-200">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-xl font-medium">
                                Price
                            </div>
                            <div className="collapse-content">
                                {/* Price */}
                                <div>
                                    <div>
                                        <Box sx={{ width: 300 }}>
                                            <Slider
                                                getAriaLabel={() => 'Temperature range'}
                                                value={priceRange}
                                                onChange={handlePriceChange}
                                                valueLabelDisplay="auto"
                                                getAriaValueText={valuetext}
                                                min={2000}
                                                max={100000}
                                            />
                                        </Box>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Hotel Cards */}
                    <div className='w-full'>
                        {/* Heading */}
                        <div className='w-full flex justify-center gap-20 items-center flex-col'>
                            <h2 className='text-black text-[32px] font-semibold'>Hotels</h2>
                            <div className='w-full flex justify-between items-center font-semibold text-[15px]'>
                                <div>Showing 4 of <span className='text-mainColor'>257 places</span></div>
                                <div>Sort by <span className='text-black'>Recommended</span></div>
                            </div>
                        </div>
                        {/* Hotels Cards */}
                        <div className='flex flex-col justify-center items-center w-full mt-14 gap-10'>
                            {/* Map through filtered hotels and generate hotel cards */}
                            {filteredHotels.length > 0 ? (
                                filteredHotels.map((hotel, index) => (
                                    <div key={hotel.id} className='w-full flex justify-center items-start rounded-2xl overflow-hidden box-shadow-two'>
                                        {/* image */}
                                        <div className='flex-shrink-0 w-[300px] h-[300px]'>
                                            {/* You can render hotel images dynamically from the hotel data */}
                                            {hotel.rooms && hotel.rooms.length > 0 && (
                                                <img className='w-full h-full' src={hotelCardsList[index % hotelCardsList.length]} alt={hotel.name} />
                                            )}
                                        </div>
                                        {/* info */}
                                        <div className='w-full flex flex-col justify-center items-start px-[24px] py-[24px]'>
                                            {/* Heading */}
                                            <div className='w-full flex justify-between items-center'>
                                                <h3 className='text-[20px] font-bold'>{hotel.name}</h3>
                                                <div className='flex flex-col justify-center items-center'>
                                                    <span>Starting from</span>
                                                    <div className='font-bold text-[26px] text-mainColor'>{hotel.rooms[0].price} DZD/night</div>
                                                </div>
                                            </div>
                                            {/* Card Info */}
                                            <div>
                                                <div className='flex justify-start gap-2 items-center'>
                                                    <div><LocationOnSharpIcon /></div>
                                                    <div className='text-[13px]'>{hotel.location}</div>
                                                </div>
                                                {/* Rating */}
                                                <div className='flex justify-center items-center gap-4'>
                                                    <div>
                                                        <Rating sx={{ padding: 0, margin: 0 }} size='large' name="read-only" value={hotel.rating} readOnly />
                                                        {hotel.rating} Stars Hotel
                                                    </div>
                                                    <div className='flex justify-center items-center gap-2'>
                                                        {/* Additional icons or elements */}
                                                    </div>
                                                </div>
                                                <div className='flex justify-start items-center gap-2 mt-2'>
                                                    <div className='py-[8.5px] px-[11px] rounded-lg bg-transparent border-solid border-[2px] border-mainColor text-[14px]'>{hotel.rating}</div>
                                                    <div className='font-bold text-[16px]'>
                                                        <span className='text-[#112211] text-[18px]'>Very Good</span> {hotel.reviews} reviews
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='h-[1px] w-full mt-5 bg-gray-400'></div>
                                            {/* Buy & Favorite Button */}
                                            <div className='flex justify-center items-center gap-5 mt-3 w-full'>
                                                <div className='flex-shrink-0 cursor-pointer w-[45px] h-[48px] flex justify-center items-center rounded-lg border-solid border-[2px] border-mainColor transition-all hover:bg-mainColor hover:border-transparent hover:text-white duration-300'>
                                                    <div><FavoriteIcon /></div>
                                                </div>
                                                <Link to="/hotel-search/hotel-profile" state={{ email: hotel.email }} className='bg-mainColor w-full h-[48px] flex justify-center items-center rounded-lg font-semibold text-[16px] cursor-pointer transition-all duration-300 border-solid border-[2px] border-mainColor hover:bg-transparent'>
                                                    <div>Book Now</div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No hotels found.</p>
                            )}
                        </div>



                        {/* Show more results */}
                        <div className='text-white bg-mainColor py-[16px] text-center w-full rounded-lg mt-10 cursor-pointer'>Show more results</div>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default HotelSearch;

