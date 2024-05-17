import profileImg from '../../images/Home/Testimonials/Image.png'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './testimonials.css'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

function Testimonial() {
  return (
    <section id='tes' className=" container mx-auto px-[40px] py-[130px] font-poppins relative">
    <h2 className='text-[#14183E] font-bold font-volkhov text-[50px] text-center mb-20'>Testimonial</h2>
                    <Swiper
                            spaceBetween={30}
                            centeredSlides={true}
                            autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                            }}
                            pagination={{
                            clickable: true,
                            }}
                            navigation={true}
                            modules={[Autoplay, Pagination, Navigation]}
                            className="mySwiper"
                        >
                            <SwiperSlide className='px-32'>
                                <div className='px-32 py-7 relative shadow-2xl rounded-2xl z-10 '>
                                    {/* Card image */}
                                    <div className='w-[68px] h-[68px] absolute top-7 left-7'><img className=' w-full h-full' src={profileImg} alt="" /></div>
                                    {/* card info */}
                                    <div className='w-full pt-[28px] pb-4 pl-[34px] pr-[68px] text-[#5E6282]'>
                                        <p className=' font-medium text-[16px] mb-[35px]'>“On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.”</p>
                                        <h3 className=' text-[20px] font-semibold'>Tlemcen Tourism Director</h3>
                                        <span className=' text-[14px]'>Tlemcen, Algeria</span>
                                    </div>
                                </div>
                            </SwiperSlide>      
                            <SwiperSlide className='px-32'>
                                <div className='px-32 py-7 relative shadow-2xl rounded-2xl z-10 '>
                                    {/* Card image */}
                                    <div className='w-[68px] h-[68px] absolute top-7 left-7'><img className=' w-full h-full' src={profileImg} alt="" /></div>
                                    {/* card info */}
                                    <div className='w-full pt-[28px] pb-4 pl-[34px] pr-[68px] text-[#5E6282]'>
                                        <p className=' font-medium text-[16px] mb-[35px]'>“On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.”</p>
                                        <h3 className=' text-[20px] font-semibold'>Tlemcen Tourism Director</h3>
                                        <span className=' text-[14px]'>Tlemcen, Algeria</span>
                                    </div>
                                </div>
                            </SwiperSlide>      
                            <SwiperSlide className='px-32'>
                                <div className='px-32 py-7 relative shadow-2xl rounded-2xl z-10 '>
                                    {/* Card image */}
                                    <div className='w-[68px] h-[68px] absolute top-7 left-7'><img className=' w-full h-full' src={profileImg} alt="" /></div>
                                    {/* card info */}
                                    <div className='w-full pt-[28px] pb-4 pl-[34px] pr-[68px] text-[#5E6282]'>
                                        <p className=' font-medium text-[16px] mb-[35px]'>“On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.”</p>
                                        <h3 className=' text-[20px] font-semibold'>Tlemcen Tourism Director</h3>
                                        <span className=' text-[14px]'>Tlemcen, Algeria</span>
                                    </div>
                                </div>
                            </SwiperSlide>      
                            <SwiperSlide className='px-32'>
                                <div className='px-32 py-7 relative shadow-2xl rounded-2xl z-10 '>
                                    {/* Card image */}
                                    <div className='w-[68px] h-[68px] absolute top-7 left-7'><img className=' w-full h-full' src={profileImg} alt="" /></div>
                                    {/* card info */}
                                    <div className='w-full pt-[28px] pb-4 pl-[34px] pr-[68px] text-[#5E6282]'>
                                        <p className=' font-medium text-[16px] mb-[35px]'>“On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.”</p>
                                        <h3 className=' text-[20px] font-semibold'>Tlemcen Tourism Director</h3>
                                        <span className=' text-[14px]'>Tlemcen, Algeria</span>
                                    </div>
                                </div>
                            </SwiperSlide>      
                            <SwiperSlide className='px-32'>
                                <div className='px-32 py-7 relative shadow-2xl rounded-2xl z-10 '>
                                    {/* Card image */}
                                    <div className='w-[68px] h-[68px] absolute top-7 left-7'><img className=' w-full h-full' src={profileImg} alt="" /></div>
                                    {/* card info */}
                                    <div className='w-full pt-[28px] pb-4 pl-[34px] pr-[68px] text-[#5E6282]'>
                                        <p className=' font-medium text-[16px] mb-[35px]'>“On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.”</p>
                                        <h3 className=' text-[20px] font-semibold'>Tlemcen Tourism Director</h3>
                                        <span className=' text-[14px]'>Tlemcen, Algeria</span>
                                    </div>
                                </div>
                            </SwiperSlide>      
                    </Swiper>
        
    </section>
  )
}

export default Testimonial