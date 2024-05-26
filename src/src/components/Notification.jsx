import React from 'react'

const Notification = () => {
  return (
<form  className="max-w-md mx-auto mt-20">
        <div className='mt-5 mb-8'>
        <h1 className='text-xl font-semibold'>Activity</h1>
        </div>
    <div className='flex flex-col gap-5'>
        <div className='flex   '>
        <input type="checkbox" name="" id="" className='w-5 h-5' />
        <p className='text-base font-medium pl-5'>Email me when someone comments on my article</p>
        </div>
        <div className='flex   '>
        <input type="checkbox" name="" id="" className='w-5 h-5' />
        <p className='text-base font-medium pl-5'> Email me when someone answers on my forum thread</p>
        </div>
        <div className='flex  '>
        <input type="checkbox" name="" id="" className='w-5 h-5' />
        <p className='text-base font-medium pl-5'>Email me when someone follows me</p>
        </div>
    </div>
        <div className='mt-20 mb-8'>
        <h2 className='text-xl font-semibold'>Application</h2>
        </div>
    <div className='flex flex-col gap-5'>
        <div className='flex   '>
        <input type="checkbox" name="" id="" className='w-5 h-5' />
        <p className='text-base font-medium pl-5'>News and announcements</p>
        </div>
        <div className='flex   '>
        <input type="checkbox" name="" id="" className='w-5 h-5' />
        <p className='text-base font-medium pl-5'> Weekly product updates</p>
        </div>
        <div className='flex  '>
        <input type="checkbox" name="" id="" className='w-5 h-5' />
        <p className='text-base font-medium pl-5'>Weekly blog digest</p>
        </div>
    </div>
    <div className="flex justify-between mt-10">
    <button type="submit" className="bg-mainColor  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save Changes</button>
    <button type="button"  className="bg-white  border border-mainColor  text-mainColor font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
    </div>
</form>
)
}

export default Notification