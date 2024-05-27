
import decoreBg from '../../images/Home/Destinations/Decore.png'
import NearMeIcon from '@mui/icons-material/NearMe';
import './destinations.css'
import { motion } from 'framer-motion';
import ibisImg from '../../assets/exterior-view.jpg'
import renissenceImg from '../../assets/renaissance.jpg'
import zianidImg from '../../assets/zianides.webp'
function Destinations() {
    const cardBg = (url) => {
        return {
            background: `url(${url})`,
            backgroundSize: '160%',
            backgroundPosition: '-90px -20px',
            backgroundRepeat: 'no-repeat',
            
        };
      };
      

  return (
    <section id='des' className="container mx-auto px-[40px] pb-[180px] font-poppins relative"> 
      {/* Heading */}
      <div className='w-fit mx-auto flex justify-center items-center flex-col mb-[60px]'>
        <h3 className='uppercase text-[#5E6282] text-base font-semibold'>Top Places</h3>
        <h1 className='text-[#14183E] font-bold font-volkhov text-[50px]'>Top Hotels</h1>
      </div>
      {/* Top 3 Destinations */}
      <div className='flex justify-between items-center gap-5'>
        {/* card */}
        <motion.div initial={{opacity: 0}} whileInView={{opacity:1}} transition={{duration:'1'}}  className='w-[315px] h-[457px] rounded-2xl overflow-hidden relative card-shadow cursor-pointer' > 
          {/* img */}
          <div className='w-full h-full bg-red-600' style={cardBg(ibisImg)}></div>
          {/* info */}
          <div className="absolute bottom-0 left-0 right-0 pt-[27px] pb-[42px] px-[20px] flex flex-col justify-between items-center text-[#5E6282] bg-white z-30"> 
            <div className='w-full flex justify-between items-center'>
                <h4>ibis</h4>
                <span>5000DA</span>
            </div>
            <div className='w-full flex justify-start items-center gap-[14px] mt-[19px]'>
                <div className=' text-black'><NearMeIcon/></div>
                <div>Days Trip</div>
            </div>
          </div>
        </motion.div>
        {/* card */}
        <motion.div initial={{opacity: 0}} whileInView={{opacity:1}} transition={{duration:'1', delay:'0.5'}}  className='w-[315px] h-[457px] rounded-2xl overflow-hidden relative card-shadow cursor-pointer' > 
          {/* img */}
          <div className='w-full h-full bg-red-600' style={cardBg(renissenceImg)}></div>
          {/* info */}
          <div className="absolute bottom-0 left-0 right-0 pt-[27px] pb-[42px] px-[20px] flex flex-col justify-between items-center text-[#5E6282] bg-white z-30"> 
            <div className='w-full flex justify-between items-center'>
                <h4>Renissence</h4>
                <span>15000DA</span>
            </div>
            <div className='w-full flex justify-start items-center gap-[14px] mt-[19px]'>
                <div className=' text-black'><NearMeIcon/></div>
                <div>Days Trip</div>
            </div>
          </div>
        </motion.div>
        {/* card */}
        <motion.div initial={{opacity: 0}} whileInView={{opacity:1}} transition={{duration:'1', delay:'1'}} className='w-[315px] h-[457px] rounded-2xl overflow-hidden relative card-shadow cursor-pointer' > 
          {/* img */}
          <div className='w-full h-full bg-red-600' style={cardBg(zianidImg)}></div>
          {/* info */}
          <div className="absolute bottom-0 left-0 right-0 pt-[27px] pb-[42px] px-[20px] flex flex-col justify-between items-center text-[#5E6282] bg-white z-30"> 
            <div className='w-full flex justify-between items-center'>
                <h4>Zianides</h4>
                <span>5500DA</span>
            </div>
            <div className='w-full flex justify-start items-center gap-[14px] mt-[19px]'>
                <div className=' text-black'><NearMeIcon/></div>
                <div>Days Trip</div>
            </div>
          </div>
        </motion.div>
        
      </div>
      {/* Decore img */}
      <div className='absolute right-[7%] top-[40%] -z-50'><img className='w-full h-full' src={decoreBg} alt="" /></div>
    </section>
  )
}

export default Destinations;
