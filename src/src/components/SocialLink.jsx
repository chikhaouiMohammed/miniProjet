import React from 'react'

const SocialLink = () => {
  return (
    <form  className="max-w-md mx-auto mt-20">
    <div className="flex flex-col gap-5">
        <div>
        <label htmlFor="" className="block text-gray-700 font-bold mb-2">facebook</label>
        <input type="text" id="text"  placeholder='https://www.facebook.com'  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
        </div>
    <div>
        <label htmlFor="" className="block text-gray-700 font-bold mb-2">Google</label>
        <input type="text" id="text"  placeholder='https://www.google.com'  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
    </div>
    <div>
        <label htmlFor="" className="block text-gray-700 font-bold mb-2">Linkedin</label>
        <input type="text" id="text"  placeholder='https://www.linkedin.com'  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
    </div>
    <div>
        <label htmlFor="" className="block text-gray-700 font-bold mb-2">Instagram</label>
        <input type="text" id="text"  placeholder='https://www.instagram.com'  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
    </div>
  </div>
  <div className="flex justify-between mt-8">
      <button type="submit" className="bg-mainColor  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save Changes</button>
      <button type="button"  className="bg-white  border border-mainColor  text-mainColor font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
  </div>
  </form>
  )
}

export default SocialLink