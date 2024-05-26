import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, db } from '../Data/Firebase';

const ChangePassword = () => {
  const { state } = useLocation();
  const navigate = useNavigate()
  // const [passwords, setPasswords] = useState({
  //   newPassword: '',
  //   confirmPassword: ''
  // });
  const [email, setEmail] = useState(state.email);

  

  const handleSubmit = async(e) => {
    e.preventDefault()
    const emailVal = e.target.email.value
    sendPasswordResetEmail(auth, emailVal)
      .then(() => {
        alert('Check Your Email')
        navigate('/login')
      })
      .catch((error) => {
        console.log(error.code)
        // ..
      });
  };

  const handleCancel = () => {
    navigate('/login')
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20">
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Your Email</label>
        <input type="text" id="email" name="email" onChange={(e)=>{setEmail(e.target.value)}} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required />
      </div>
      {/* <div className="mb-4">
        <label htmlFor="newPassword" className="block text-gray-700 font-bold mb-2">New Password</label>
        <input type="password" id="newPassword" name="newPassword" value={passwords.newPassword} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required />
      </div>
      <div className="mb-6">
        <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">Confirm Password</label>
        <input type="password" id="confirmPassword" name="confirmPassword" value={passwords.confirmPassword} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required />
      </div> */}
      <div className="flex justify-between">
      <button type="button" onClick={handleCancel} className="px-[30px] py-[12px] bg-mainColor cursor-pointer rounded-3xl border-[1px] border-solid border-mainColor transition-all duration-500 ease-in-out text-white hover:bg-white hover:text-black">Cancel</button>
        <button type="submit" className="px-[30px] py-[12px] bg-transparent cursor-pointer rounded-3xl border-[1px] border-solid border-mainColor transition-all duration-500 ease-in-out hover:bg-mainColor hover:text-white">Reset Your PAssword</button>
      </div>
    </form>
  );
};

export default ChangePassword;
