import imglogin1 from '../../assets/25f3792bb151520d1ae87926e8e6633a 1.png';
import { FcGoogle } from "react-icons/fc";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordLine } from "react-icons/ri";
import iconfcb from '../../assets/icons8-facebook-nouveau-64.png';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import './style.css';
import { auth, db } from '../../Data/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { adminRoute, hotelOwnerRoute, hotelSearchRoute } from '../../Routes';
import { AuthContext } from '../../context/AuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSecreter, setIsSecreter] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleSecEmail = (e) => {
    setEmail(e.target.value);
  };
  
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async () => {
    setLoading(true);
  
    const guestUsersRef = collection(db, 'guestUsers');
    const guestUserQuery = query(guestUsersRef, where('email', '==', email));
    const hotelUsersRef = collection(db, 'hotelUsers');
    const hotelUserQuery = query(hotelUsersRef, where('email', '==', email));
    const adminRef = collection(db, 'Admin');
    const adminQuery = query(adminRef, where('email', '==', email));
  
    try {
      const guestUserSnapshot = await getDocs(guestUserQuery);
      if (guestUserSnapshot.size === 1) {
        // User is a guest
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            dispatch({ type: "LOGIN", payload: { user: user, role: "guest", email: email } }); // Include email in payload
            navigate(hotelSearchRoute);
          })
          .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
          })
          .finally(() => {
            setLoading(false);
          });
        return;
      }
  
      const hotelUserSnapshot = await getDocs(hotelUserQuery);
      if (hotelUserSnapshot.size === 1) {
        // User is a hotel owner
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            dispatch({ type: "LOGIN", payload: { user: user, role: "hotel-owner", email: email } }); // Include email in payload
            navigate(hotelOwnerRoute);
          })
          .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
          })
          .finally(() => {
            setLoading(false);
          });
        return; // Exit function
      }
      const adminSnapshot = await getDocs(adminQuery)
      if(adminSnapshot.size === 1){
         // User is an admin
         signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
           const user = userCredential.user;
           dispatch({ type: "LOGIN", payload: { user: user, role: "admin", email: email } }); // Include email in payload
           navigate(adminRoute);
         })
         .catch((error) => {
           const errorMessage = error.message;
           alert(errorMessage);
         })
         .finally(() => {
           setLoading(false);
         });
       return; // Exit function
      }
      
      alert('User not found');
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user:", error);
      setLoading(false);
    }
    
  };
  
  const handleRole = (value) => {
    
    if(value == 'secreter'){
      setIsSecreter(true)
    }
    else {
      setIsSecreter(false)
    }
    
  }

  return (
    <div className='w-full h-screen flex items-start'>
      <div className='relative w-1/2 h-full flex flex-col'>
        <img className='h-full w-full object-cover' src={imglogin1} alt="" />
      </div>
      <div className='w-1/2 h-full bg-[#FFFFFF] flex flex-col p-20 justify-between items-center '>
        <div className='w-full flex flex-col max-w-[400px]'>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn bg-red-500" onClick={()=>document.getElementById('my_modal_3').showModal()}>Before Login Chose Your Role Here !</button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className='w-full flex justify-center items-center mb-5'>Who you are ?</h3>
            <div className='flex justify-between items-center'>
              <button className="btn btn-info" onClick={()=> handleRole('guest')}>Guest</button>
              <button className="btn btn-success" onClick={()=> handleRole('secreter')}>Secreter</button>
              <button className="btn btn-warning" onClick={()=> handleRole('hotelOwner')}>Hotel Owner</button>
            </div>
            <p className="py-4">Press ESC key or click on ✕ button to close</p>
          </div>
        </dialog>
          <div className='w-full flex flex-col mb-5'>
            <h3 className='text-3xl font-medium mb-4'>Sign in</h3>
            <p className='text-sm mb-2'>If you don’t have an account register
              <br />
              You can &nbsp;
              <Link to='/register' className='text-mainColor cursor-pointer'>
                Register here !
              </Link>
            </p>
          </div>
          <div className='w-full flex flex-col mt-3 '>
            <div className='relative'>
              <label htmlFor="email">Email</label>
              <TfiEmail className='absolute bottom-7'/>
              <input type="email"
                onChange={handleEmail}
                id="email"
                placeholder='Enter Your Email Address'
                className='w-full text-black py-3 pl-6 my-3 border-b border-[#FF432A] outline-none focus:outline-none bg-none'
              />
            </div>
            {/* Are you a Secreter? */}
            {isSecreter && <div className='relative'>
                            <label htmlFor="email">Hotel Secreter Email</label>
                              <TfiEmail className='absolute bottom-7'/>
                              <input type="email"
                                onChange={handleSecEmail}
                                id="email"
                                placeholder='Secreter Email Address'
                                className='w-full text-black py-3 pl-6 my-3 border-b border-[#FF432A] outline-none focus:outline-none bg-none'
                              />
                          </div>}
            <div className='relative'>
              <label className='mt-8' htmlFor="">Password</label>
              <RiLockPasswordLine className='absolute bottom-7 ' />
              <input type="password"
                onChange={handlePassword}
                placeholder=' Entrer Your Password'
                className='w-full text-black py-3 pl-5 my-3 border-b border-black outline-none focus:outline-none bg-none'
              />
            </div>
          </div>
          <div className='w-full flex items-center justify-between'>
            <div className='w-full flex items-center'>
              <input type="checkbox" className='w-4 h-4 mr-2 '/>
            </div>
            <p className='text-sm  whitespace-nowrap cursor-pointer'>Forget Password ?</p>
          </div>
          <div className='w-full flex flex-col mt-8 pt-8'>
            <button className='w-full my-2 bg-mainColor rounded-3xl shadow p-4 text-center text-white flex items-center justify-center font-medium' onClick={handleSignIn}>Login</button>
          </div>
          <div className='w-full flex items-center justify-center relative py-7'>
            <p className='text-[#B5B5B5] font-medium text-xl'>Or continue with</p>
          </div>
          <div className='flex items-center justify-center space-x-6 pt-4'>
            <a href=""><img src={iconfcb} alt="" className='w-12 h-12' /></a>
            <i><a href=""><FcGoogle className='w-10 h-10' /></a></i>
          </div>
        </div>
      </div>
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
