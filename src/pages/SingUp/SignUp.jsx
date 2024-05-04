import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword } from 'firebase/auth';
import imglogin1 from '../../assets/25f3792bb151520d1ae87926e8e6633a 1.png'
import { FcGoogle } from "react-icons/fc";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import iconfcb from '../../assets/icons8-facebook-nouveau-64.png'
import { Link } from 'react-router-dom';
import { hotelOwnerRoute, hotelSearchRoute } from '../../Routes';
import './style.css'
import { auth, db } from '../../Data/Firebase';
import { collection, doc, setDoc } from 'firebase/firestore';



const SignUp = () => {

  const [userType, setUserType] = useState('guest');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  
  // const hotelsCollectionRef = doc(collection(db,'hotelList','Tlemcen', 'hotels'))
  const hotelListRef = collection(db,"hotelList");

  // Reference to the document named "Tlemcen" within hotelList collection
  const tlemcenDocRef = doc(hotelListRef,"Tlemcen");

  // Reference to the subcollection "hotels" within the "Tlemcen" document
  // const hotelsCollectionRef = collection(tlemcenDocRef,"hotels");

  
  const handleUserTypeChange = (value) => {
    setUserType(value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value); 
  };
  const handleFirstName = (event) => {
    setFirstName(event.target.value); 
  };
  const handleLastName = (event) => {
    setLastName(event.target.value); 
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value); 
  };
  const handleConfirmedPassword = (event) => {
    setConfirmedPassword(event.target.value); 
  };

  const handleSignUp = async () => {
    if (password === confirmedPassword) {
      setLoading(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (userType === 'guest') {
          await setDoc(doc(db, "guestUsers", email), {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
          });
          navigate(hotelSearchRoute);
        } else if (userType === 'hotelOwner') {
          await setDoc(doc(db, "hotelUsers", email), {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
          });
          await setDoc(doc(collection(tlemcenDocRef,"hotels"), email), {
            "email": email
          });
          
          navigate(hotelOwnerRoute); 
        }
        setRegistered(true);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      } finally {
        setLoading(false);
      }
    } else {
      setError(true);
    }
  };
 
  

  
  return (
    <div>
        
        <div className=' w-full h-screen flex items-start'>
      
      <div className='relative w-1/2 h-full flex flex-col'>
      <img className=' h-full w-full object-cover' src={imglogin1} alt="" />
      </div>
    <div className='w-1/2 h-full bg-[#FFFFFF] flex flex-col p-20 justify-between items-center '>
        
      <div className='w-full flex flex-col max-w-[500px]'>
        <div className='w-full flex flex-col mb-5'>
            <h3 className='text-3xl font-medium mb-4'>Sign Up</h3>
            <p className='text-sm mb-2'>If you already have an account register
            <br />
            You can &nbsp;  
            <Link to='/login' className=' text-mainColor cursor-pointer'>
            Login here !
            </Link >
            </p>
        </div>
      <div className='w-full flex flex-col mt-3 '>
        <div className='relative'>
          <label  htmlFor="email">Email</label>
          <TfiEmail className='absolute bottom-7'/>
          <input type="email" 
          id="email"
          placeholder='Enter Your Email Address'
          className='w-full text-black py-3 pl-7 my-3 border-b border-[#FF432A] outline-none focus:outline-none bg-none'
          onChange={handleEmailChange}
          /> 
        </div>
        <div className='relative'>
          <label  htmlFor="email">First Name</label>
          <CiUser className='absolute bottom-7'/>
          <input type="text" 
          onChange={handleFirstName}
          placeholder='Enter Your First Name'
          className='w-full text-black py-3 pl-6 my-3 border-b border-black outline-none focus:outline-none bg-none'
          /> 
        </div>
        <div className='relative'>
          <label  htmlFor="email">Last Name</label>
          <CiUser className='absolute bottom-7'/>
          <input type="text" 
          onChange={handleLastName}
          placeholder='Enter Your Last Name'
          className='w-full text-black py-3 pl-6 my-3 border-b border-black outline-none focus:outline-none bg-none'
          /> 
        </div>
        <div className='relative'>
        <label className='mt-8' htmlFor="">Password</label>
          <RiLockPasswordLine className='absolute bottom-7 ' />
          <input type="password"
          placeholder=' Entrer Your Password'
          className='w-full text-black py-3 pl-5 my-3 border-b border-black outline-none focus:outline-none bg-none'
          onChange={handlePasswordChange}
          />
        </div>
        <div className='relative'>
          <label  htmlFor="email">Confirm Password</label>
          <RiLockPasswordLine className='absolute bottom-7'/>
          <input type="password" 
          onChange={handleConfirmedPassword}
          placeholder='Confirm Your Password'
          className='w-full text-black py-3 pl-6 my-3 border-b border-black outline-none focus:outline-none bg-none'
          /> 
        </div>
      </div>
      <div className='text-black font-semibold'>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Are you looking to book a room with us?</span> 
            <input type="radio" name="radio-10" className="radio checked:bg-red-500" checked={userType === 'guest'}  onChange={() => handleUserTypeChange('guest')}
  />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Are you managing a hotel with us?</span> 
            <input type="radio" name="radio-10" className="radio checked:bg-blue-500" checked={userType === 'hotelOwner'}  onChange={() => handleUserTypeChange('hotelOwner')}
  />
          </label>
        </div>
      </div>
      
        <div className='w-full flex flex-col mt-7 pt-7'>
          <button className='w-full my-1 bg-mainColor rounded-3xl shadow p-4 text-center text-white flex items-center justify-center font-medium ' onClick={handleSignUp}>Register</button>
        </div>
    </div>
    </div>
        </div>
        {loading && (
                <div className="loader-container">
                    <div className="loader"></div>                                                                                
                </div>
            )}
            {registered && (
          <div role="alert" className="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Youve been registered successfully!</span>
          </div>
        )}
    </div>
  )
}

export default SignUp