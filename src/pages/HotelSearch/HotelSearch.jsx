import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ReactCountryFlag from "react-country-flag"
import userImg from '../../images/Home/paymentPage/alexander-hipp-iEEBWgY_6lA-unsplash.jpg'
import './hotelSearch.css'
import { Box, FormControlLabel, FormGroup, Rating, Slider } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
// images
import firstImg from '../../images/HotelSearchPage/Rectangle 3.png'
import secondImg from '../../images/HotelSearchPage/Rectangle 3 (1).png'
import thirdImg from '../../images/HotelSearchPage/Rectangle 3 (2).png'
import fourthImg from '../../images/HotelSearchPage/Rectangle 3 (3).png'

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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];
const destinations = [
    'Tlemcen',
    'Oran',
    'Algiers'
]
const labels = {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
  };
function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }
function valuetext(value) {
return `${value}DA`;
}

function HotelSearch() {
    const [language, setLanguage] = useState('EN');
    const [arrowStatus, setArrowStatus] = useState(false);
    const [personName, setPersonName] = useState([]);
    const [theDestination, setDestination] = useState([]);
    const [value, setValue] = useState(2);
    const [hover, setHover] = useState(-1);
    const [priceValue, setPriceValue] = useState([2000,20000]);

    const handleRoomTypeChange = (event) => {
        const {
        target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleDestinationChange = (event) => {
        const {
        target: { value },
        } = event;
        setDestination(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handlePriceChange = (event, value) => {
        setPriceValue(value);
      };
      const handleCheckInDateChange = (date) => {
        console.log("Selected Check-In Date:", date);
        
    };

    
    

  return (
    <div className='font-poppins text-mainTextColor'>
        <header className='w-full px-[100px] py-[20px] flex justify-between items-center box-shadow'>
            <div className="navbar bg-base-100">
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
        {/* Images Carousel */}
        <div className="carousel w-full">
            <div id="slide1" className="carousel-item relative w-full">
                <img src="https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" className="btn btn-circle">❮</a> 
                <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div> 
            <div id="slide2" className="carousel-item relative w-full">
                <img src="https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" className="btn btn-circle">❮</a> 
                <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div> 
            <div id="slide3" className="carousel-item relative w-full">
                <img src="https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" className="btn btn-circle">❮</a> 
                <a href="#slide4" className="btn btn-circle">❯</a>
                </div>
            </div> 
            <div id="slide4" className="carousel-item relative w-full">
                <img src="https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" className="btn btn-circle">❮</a> 
                <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
        <section className=" w-full container mx-auto pb-[63px]">
            {/* CheckIn & CheckOut and search info */}
            <div className='px-[24px] py-[32px] flex justify-center gap-5 items-center box-shadow'>
                {/* Destination */}
                <div className='w-[400px]'>
                    <FormControl fullWidth sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-checkbox-label">Enter Destination</InputLabel>
                        <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={theDestination}
                        onChange={handleDestinationChange}
                        input={<OutlinedInput label="Enter Destination" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                        >
                        {destinations.map((destination) => (
                            <MenuItem key={destination} value={destination}>
                            <Checkbox checked={theDestination.indexOf(destination) > -1} />
                            <ListItemText primary={destination} />
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>

                </div>
                {/* Check In */}
                <div className='w-[340px]'>
                    <Box sx={{width:'100%'}}>
                        <LocalizationProvider  dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker']}>
                                <DateTimePicker label="Check out date"  onChange={(date) => handleCheckInDateChange(date)}/>
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>
                </div>
                {/* Check Out */}
                <div className='w-[340px]'>
                    <Box sx={{width:'100%'}}>
                        <LocalizationProvider  dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker']}>
                                <DateTimePicker label="Check out date" />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>
                </div>
                {/* Room Type */}
                <div className='w-fit'>
                    <FormControl fullWidth sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-checkbox-label">Room Types</InputLabel>
                        <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={personName}
                        onChange={handleRoomTypeChange}
                        input={<OutlinedInput label="Room Types" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                        >
                        {names.map((name) => (
                            <MenuItem key={name} value={name}>
                            <Checkbox checked={personName.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </div>
                <div className='bg-mainColor px-[16px] py-[14px] rounded-md cursor-pointer transition-all duration-300 hover:bg-transparent border-solid border-mainColor border-[2px] '><div className='text-black'><SearchIcon/></div></div>
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
                                    value={value}
                                    getLabelText={getLabelText}
                                    onChange={(event, newValue) => {
                                    setValue(newValue);
                                    }}
                                    onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                    }}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                {value !== null && (
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
                                value={priceValue}
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
                        {/* Hotel Card */}
                        <div className='w-full flex justify-center items-start rounded-2xl overflow-hidden box-shadow-two'>
                            {/* image */}
                            <div className='flex-shrink-0 w-[300px] h-[300px]'><img className='w-full h-full' src={firstImg} alt="" /></div>
                            {/* info */}
                            <div className='w-full flex flex-col justify-center items-start px-[24px] py-[24px]'>
                                {/* Heading */}
                                <div className='w-full flex justify-between items-center'>
                                    <h3 className='text-[20px] font-bold'>Hotel Name</h3>
                                    <div className='flex flex-col justify-center items-center'>
                                        <span>Staring from</span>
                                        <div className='font-bold text-[26px] text-mainColor'>11 111 DZD/night</div>
                                    </div>
                                </div>
                                {/* Card Info */}
                                <div>
                                    <div className='flex justify-start gap-2 items-center'>
                                        <div><LocationOnSharpIcon/></div>
                                        <div className='text-[13px]'>Tlemcen,Algeria</div>
                                    </div>
                                    {/* Rating */}
                                    <div className='flex justify-center items-center gap-4'>
                                        <div><Rating sx={{padding:0,margin:0}} size='large' name="read-only" value={5} readOnly /> 5 Stars Hotel</div>
                                        <div className='flex justify-center items-center gap-2'><div className='w-fit h-fit'><FreeBreakfastIcon/></div><span>20+ Aminities</span></div>
                                    </div>
                                    <div className='flex justify-start items-center gap-2 mt-2'>
                                        <div className='py-[8.5px] px-[11px] rounded-lg bg-transparent border-solid border-[2px] border-mainColor text-[14px]'>4.2</div>
                                        <div className='font-bold text-[16px]'><span className='text-[#112211] text-[18px]'>Very Good</span> 371 reviews</div>
                                    </div>
                                    {/* line */}
                                    
                                </div>
                                <div className='h-[1px] w-full mt-5 bg-gray-400'></div>
                                {/* Buy & Favorite Button */}
                                <div className='flex justify-center items-center gap-5 mt-3 w-full'>
                                    <div className='flex-shrink-0 cursor-pointer w-[45px] h-[48px] flex justify-center items-center rounded-lg border-solid border-[2px] border-mainColor transition-all hover:bg-mainColor hover:border-transparent hover:text-white duration-300'><div><FavoriteIcon/></div></div>
                                    <div className=' bg-mainColor w-full h-[48px] flex justify-center items-center rounded-lg font-semibold text-[16px] cursor-pointer transition-all duration-300 border-solid border-[2px] border-mainColor hover:bg-transparent'><div>Book Now</div></div>
                                </div>
                            </div>
                        </div>
                        {/* Hotel Card */}
                        <div className='w-full flex justify-center items-start rounded-2xl overflow-hidden box-shadow-two'>
                            {/* image */}
                            <div className='flex-shrink-0 w-[300px] h-[300px]'><img className='w-full h-full' src={secondImg} alt="" /></div>
                            {/* info */}
                            <div className='w-full flex flex-col justify-center items-start px-[24px] py-[24px]'>
                                {/* Heading */}
                                <div className='w-full flex justify-between items-center'>
                                    <h3 className='text-[20px] font-bold'>Hotel Name</h3>
                                    <div className='flex flex-col justify-center items-center'>
                                        <span>Staring from</span>
                                        <div className='font-bold text-[26px] text-mainColor'>11 111 DZD/night</div>
                                    </div>
                                </div>
                                {/* Card Info */}
                                <div>
                                    <div className='flex justify-start gap-2 items-center'>
                                        <div><LocationOnSharpIcon/></div>
                                        <div className='text-[13px]'>Tlemcen,Algeria</div>
                                    </div>
                                    {/* Rating */}
                                    <div className='flex justify-center items-center gap-4'>
                                        <div><Rating sx={{padding:0,margin:0}} size='large' name="read-only" value={5} readOnly /> 5 Stars Hotel</div>
                                        <div className='flex justify-center items-center gap-2'><div className='w-fit h-fit'><FreeBreakfastIcon/></div><span>20+ Aminities</span></div>
                                    </div>
                                    <div className='flex justify-start items-center gap-2 mt-2'>
                                        <div className='py-[8.5px] px-[11px] rounded-lg bg-transparent border-solid border-[2px] border-mainColor text-[14px]'>4.2</div>
                                        <div className='font-bold text-[16px]'><span className='text-[#112211] text-[18px]'>Very Good</span> 371 reviews</div>
                                    </div>
                                    {/* line */}
                                    
                                </div>
                                <div className='h-[1px] w-full mt-5 bg-gray-400'></div>
                                {/* Buy & Favorite Button */}
                                <div className='flex justify-center items-center gap-5 mt-3 w-full'>
                                    <div className='flex-shrink-0 cursor-pointer w-[45px] h-[48px] flex justify-center items-center rounded-lg border-solid border-[2px] border-mainColor transition-all hover:bg-mainColor hover:border-transparent hover:text-white duration-300'><div><FavoriteIcon/></div></div>
                                    <div className=' bg-mainColor w-full h-[48px] flex justify-center items-center rounded-lg font-semibold text-[16px] cursor-pointer transition-all duration-300 border-solid border-[2px] border-mainColor hover:bg-transparent'><div>Book Now</div></div>
                                </div>
                            </div>
                        </div>
                        {/* Hotel Card */}
                        <div className='w-full flex justify-center items-start rounded-2xl overflow-hidden box-shadow-two'>
                            {/* image */}
                            <div className='flex-shrink-0 w-[300px] h-[300px]'><img className='w-full h-full' src={thirdImg} alt="" /></div>
                            {/* info */}
                            <div className='w-full flex flex-col justify-center items-start px-[24px] py-[24px]'>
                                {/* Heading */}
                                <div className='w-full flex justify-between items-center'>
                                    <h3 className='text-[20px] font-bold'>Hotel Name</h3>
                                    <div className='flex flex-col justify-center items-center'>
                                        <span>Staring from</span>
                                        <div className='font-bold text-[26px] text-mainColor'>11 111 DZD/night</div>
                                    </div>
                                </div>
                                {/* Card Info */}
                                <div>
                                    <div className='flex justify-start gap-2 items-center'>
                                        <div><LocationOnSharpIcon/></div>
                                        <div className='text-[13px]'>Tlemcen,Algeria</div>
                                    </div>
                                    {/* Rating */}
                                    <div className='flex justify-center items-center gap-4'>
                                        <div><Rating sx={{padding:0,margin:0}} size='large' name="read-only" value={5} readOnly /> 5 Stars Hotel</div>
                                        <div className='flex justify-center items-center gap-2'><div className='w-fit h-fit'><FreeBreakfastIcon/></div><span>20+ Aminities</span></div>
                                    </div>
                                    <div className='flex justify-start items-center gap-2 mt-2'>
                                        <div className='py-[8.5px] px-[11px] rounded-lg bg-transparent border-solid border-[2px] border-mainColor text-[14px]'>4.2</div>
                                        <div className='font-bold text-[16px]'><span className='text-[#112211] text-[18px]'>Very Good</span> 371 reviews</div>
                                    </div>
                                    {/* line */}
                                    
                                </div>
                                <div className='h-[1px] w-full mt-5 bg-gray-400'></div>
                                {/* Buy & Favorite Button */}
                                <div className='flex justify-center items-center gap-5 mt-3 w-full'>
                                    <div className='flex-shrink-0 cursor-pointer w-[45px] h-[48px] flex justify-center items-center rounded-lg border-solid border-[2px] border-mainColor transition-all hover:bg-mainColor hover:border-transparent hover:text-white duration-300'><div><FavoriteIcon/></div></div>
                                    <div className=' bg-mainColor w-full h-[48px] flex justify-center items-center rounded-lg font-semibold text-[16px] cursor-pointer transition-all duration-300 border-solid border-[2px] border-mainColor hover:bg-transparent'><div>Book Now</div></div>
                                </div>
                            </div>
                        </div>
                        {/* Hotel Card */}
                        <div className='w-full flex justify-center items-start rounded-2xl overflow-hidden box-shadow-two'>
                            {/* image */}
                            <div className='flex-shrink-0 w-[300px] h-[300px]'><img className='w-full h-full' src={fourthImg} alt="" /></div>
                            {/* info */}
                            <div className='w-full flex flex-col justify-center items-start px-[24px] py-[24px]'>
                                {/* Heading */}
                                <div className='w-full flex justify-between items-center'>
                                    <h3 className='text-[20px] font-bold'>Hotel Name</h3>
                                    <div className='flex flex-col justify-center items-center'>
                                        <span>Staring from</span>
                                        <div className='font-bold text-[26px] text-mainColor'>11 111 DZD/night</div>
                                    </div>
                                </div>
                                {/* Card Info */}
                                <div>
                                    <div className='flex justify-start gap-2 items-center'>
                                        <div><LocationOnSharpIcon/></div>
                                        <div className='text-[13px]'>Tlemcen,Algeria</div>
                                    </div>
                                    {/* Rating */}
                                    <div className='flex justify-center items-center gap-4'>
                                        <div><Rating sx={{padding:0,margin:0}} size='large' name="read-only" value={5} readOnly /> 5 Stars Hotel</div>
                                        <div className='flex justify-center items-center gap-2'><div className='w-fit h-fit'><FreeBreakfastIcon/></div><span>20+ Aminities</span></div>
                                    </div>
                                    <div className='flex justify-start items-center gap-2 mt-2'>
                                        <div className='py-[8.5px] px-[11px] rounded-lg bg-transparent border-solid border-[2px] border-mainColor text-[14px]'>4.2</div>
                                        <div className='font-bold text-[16px]'><span className='text-[#112211] text-[18px]'>Very Good</span> 371 reviews</div>
                                    </div>
                                    {/* line */}
                                    
                                </div>
                                <div className='h-[1px] w-full mt-5 bg-gray-400'></div>
                                {/* Buy & Favorite Button */}
                                <div className='flex justify-center items-center gap-5 mt-3 w-full'>
                                    <div className='flex-shrink-0 cursor-pointer w-[45px] h-[48px] flex justify-center items-center rounded-lg border-solid border-[2px] border-mainColor transition-all hover:bg-mainColor hover:border-transparent hover:text-white duration-300'><div><FavoriteIcon/></div></div>
                                    <div className=' bg-mainColor w-full h-[48px] flex justify-center items-center rounded-lg font-semibold text-[16px] cursor-pointer transition-all duration-300 border-solid border-[2px] border-mainColor hover:bg-transparent'><div>Book Now</div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Shw more results */}
                    <div className='text-white bg-mainColor py-[16px] text-center w-full rounded-lg mt-10 cursor-pointer'>Show more results</div>
                </div>
            </div>
        </section>
    </div>
    
  )
}

export default HotelSearch
