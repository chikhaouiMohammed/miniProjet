import React from 'react'
import userimg from '../images/Ellipse 437.png'
const UserInfo = () => {
  return (
    <div className='  flex flex-col  ml-[500px]'>
        <div className='ml-9 mb-3 mt-3'>
        <h1 className='text-2xl font-bold'>Personal Details</h1>
        </div>
       
       <div className='flex items-center'>
        <img src={userimg} alt="" className='' />
        <div className='flex flex-col gap-4'>
        <h3 className='font-semibold text-[20px]'>Name</h3> 
        <span className='font-medium text-sm opacity-80'>issam</span>
        <h3 className='font-semibold text-[20px]'>Sexe</h3> 
        <span className='font-medium text-sm opacity-80 '>Male</span>
        <h3 className='font-semibold text-[20px] text-nowrap'>Date de Nicense</h3> 
        <span className='font-medium text-sm opacity-80 '>12/08/2003</span>
        <h3 className='font-semibold text-[20px]'>Nationality</h3> 
        <span className='font-medium text-sm opacity-80 '>Algerien</span>
        </div>
       
        
       
        
       
       </div>
       <div className='flex items-start gap-[150px]'>
       
       <div className='flex flex-col gap-2 ml-4'>
       <h1 className='text-2xl font-bold mb-2'>Adresse</h1>
        <h3 className='font-semibold text-[20px] text-nowrap'>Adress Line</h3> 
        <span className='font-medium text-sm opacity-80'>No 35 Jimmy Ebi Stree</span>
        <h3 className='font-semibold text-[20px]'>City</h3> 
        <span className='font-medium text-sm opacity-80 '>Yenagoa</span>
        <h3 className='font-semibold text-[20px] text-nowrap'>State</h3> 
        <span className='font-medium text-sm opacity-80 '>Bayelsa</span>
        <h3 className='font-semibold text-[20px]'>Country</h3> 
        <span className='font-medium text-sm opacity-80 '>Algeria</span>
        </div>
        <div className='flex flex-col gap-2'>
        <h1 className='text-2xl font-bold mb-2 text-nowrap'>Contact Details</h1>
        <h3 className='font-semibold text-[20px] text-nowrap'>Phone Number</h3> 
        <span className='font-medium text-sm opacity-80'>09034867656</span>
        <h3 className='font-semibold text-[20px]'>Email</h3> 
        <span className='font-medium text-sm opacity-80 '>tomilola@me.com</span>
        </div>
        
       </div>
     

    </div>
  )
}

export default UserInfo