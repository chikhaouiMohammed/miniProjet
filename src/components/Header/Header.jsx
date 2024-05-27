import { motion } from 'framer-motion';
import './header.css'
import { Link } from 'react-router-dom';


import logo from "../../images/logo.png"

function  Header() {
    

    return (
        <header className='container h-[100px] overflow-hidden mx-auto px-[40px] font-poppins flex justify-between items-center py-[50px] text-mainTextColor'>
            {/* Logo */}
            <div className='w-[250px] cursor-pointer'><img className='w-full h-full' src={logo} alt="" /></div>

            {/* Navbar */}
            <nav className='py-5 text-base'>
                <ul className='flex justify-center items-center gap-10'>
                    <motion.li initial={{opacity:0}} whileInView={{opacity: 1}} transition={{duration:'0.5'}}><a href="#services" className=' transition-all ease-in duration-300 hover:text-black'>Services</a></motion.li>
                    <motion.li initial={{opacity:0}} whileInView={{opacity: 1}} transition={{duration:'0.5', delay: '0.5'}}><a href="#des" className=' transition-all ease-in duration-300 hover:text-black'>Destinations</a></motion.li>
                    <motion.li initial={{opacity:0}} whileInView={{opacity: 1}} transition={{duration:'0.5', delay: '1'}}><a href="#tes" className=' transition-all ease-in duration-300 hover:text-black'>Testimonial</a></motion.li>
                    <motion.li initial={{opacity:0}} whileInView={{opacity: 1}} transition={{duration:'0.5', delay: '1.5'}}><a href="#footer" className=' transition-all ease-in duration-300 hover:text-black'>Contact</a></motion.li>
                    <Link to='/login' className=' px-[30px] py-[12px] bg-transparent cursor-pointer rounded-3xl border-[1px] border-solid border-mainColor transition-all duration-500 ease-in-out hover:bg-mainColor hover:text-white'>Log In</Link>
                    <Link to='/register' className='px-[30px] py-[12px] bg-mainColor text-white cursor-pointer rounded-3xl transition-all duration-500 ease-in-out hover:bg-transparent hover:text-mainTextColor border-[1px] border-white hover:border-mainColor border-solid'>Sign Up</Link>
                </ul>
                
            </nav>
        </header>
    )
}

export default Header;
