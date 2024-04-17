import React from 'react'

const Connection = () => {
  return (
    <form  className="max-w-md mx-auto mt-20">
        <div className='flex flex-col gap-8'>
        <h3 className='text-xl'>connect To<span className='text-black font-bold pl-2'><a href="#">Facebook</a></span></h3>
        <div className='flex justify-between'>
        <h3 className='text-xl'>You are connect to Google </h3>
        <span className=' text-gray-500 font-normal text-2xl'>Remove</span>
        </div>
       
        <h3 className='text-xl'>connect To<span className='text-black font-bold pl-2'><a href="#">Instagrame</a></span></h3>
        </div>
        <div className="flex justify-between mt-10">
      <button type="submit" className="bg-mainColor  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save Changes</button>
      <button type="button"  className="bg-white  border border-mainColor  text-mainColor font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
    </div>
       
    </form>
  )
}

export default Connection