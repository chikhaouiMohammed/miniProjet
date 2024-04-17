import React, { useState } from 'react'

const ChangePassword = () => {
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prevPasswords => ({
          ...prevPasswords,
          [name]: value
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic here to handle form submission
        console.log('Submitted:', passwords);
      };
    
      const handleCancel = () => {
        // Reset the form fields or perform any other necessary action
        setPasswords({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      };
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20">
    <div className="mb-4">
      <label htmlFor="currentPassword" className="block text-gray-700 font-bold mb-2">Current Password</label>
      <input type="password" id="currentPassword" name="currentPassword" value={passwords.currentPassword} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required />
    </div>
    <div className="mb-4">
      <label htmlFor="newPassword" className="block text-gray-700 font-bold mb-2">New Password</label>
      <input type="password" id="newPassword" name="newPassword" value={passwords.newPassword} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required />
    </div>
    <div className="mb-6">
      <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">Confirm Password</label>
      <input type="password" id="confirmPassword" name="confirmPassword" value={passwords.confirmPassword} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required />
    </div>
    <div className="flex justify-between">
      <button type="submit" className="bg-mainColor  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save Changes</button>
      <button type="button" onClick={handleCancel} className="bg-white  border border-mainColor  text-mainColor font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
    </div>
  </form>
  )
}

export default ChangePassword