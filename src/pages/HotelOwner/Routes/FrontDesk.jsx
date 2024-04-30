import { ImageList, ImageListItem } from '@mui/material';
import React, { useState } from 'react';

function FrontDesk() {

  const [rating, setRating] = useState(3); 


  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value)); 
    
  };
  const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
      title: 'Bed',
    },
    {
      img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
      title: 'Books',
    },
    {
      img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
      title: 'Sink',
    },
    {
      img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
      title: 'Kitchen',
    },
    {
      img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
      title: 'Blinds',
    },
    {
      img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
      title: 'Chairs',
    },
    {
      img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
      title: 'Laptop',
    },
    {
      img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
      title: 'Doors',
    },
    {
      img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
      title: 'Coffee',
    },
    {
      img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
      title: 'Storage',
    },
    {
      img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
      title: 'Candle',
    },
    {
      img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
      title: 'Coffee table',
    },
  ];

  return (
    <div className="font-poppins w-full p-10">
      <div className='w-full p-5'>
        {/* the date */}
        <div className='text-center font-semibold text-xl my-10'>
          {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: '2-digit', year: 'numeric' })}
        </div>
      </div>
      {/* Content */}
      <div className="w-full flex justify-start items-start gap-10">
        {/* Hotel Details */}
        <div className='flex-col justify-center items-start gap-10'>
            {/* Hotel Name */}
            <label className="form-control w-full max-w-xs my-5">
            <div className="label">
                <span className="label-text text-2xl font-semibold">What is your hotel name?</span>
            </div>
            <input type="text" placeholder="Type here" className="input input-bordered input-accent w-full max-w-xs" />
            </label>
            {/* Hotel rating */}
            <div className="flex flex-col justify-center gap-4 items-start my-5">
            <div className="text-2xl font-semibold">What is your hotel rating?</div>
            <div className="rating rating-lg">
                <input type="radio" name="rating" value="1" className="mask mask-star-2 bg-orange-400" onChange={handleRatingChange} checked={rating === 1} />
                <input type="radio" name="rating" value="2" className="mask mask-star-2 bg-orange-400" onChange={handleRatingChange} checked={rating === 2} />
                <input type="radio" name="rating" value="3" className="mask mask-star-2 bg-orange-400" onChange={handleRatingChange} checked={rating === 3} />
                <input type="radio" name="rating" value="4" className="mask mask-star-2 bg-orange-400" onChange={handleRatingChange} checked={rating === 4} />
                <input type="radio" name="rating" value="5" className="mask mask-star-2 bg-orange-400" onChange={handleRatingChange} checked={rating === 5} />
                <div className="text-2xl font-semibold mt-2 ml-3">Selected Rating: {rating}</div>
            </div>
            </div>
            {/* Hotel Services */}
            <div className="form-control w-[300px] my-5">
                <div className="text-2xl font-semibold mb-4">What is the hotel services?</div>
                <label className="cursor-pointer label">
                    <span className="label-text">Breakfast</span>
                    <input type="checkbox" defaultChecked className="checkbox checkbox-success" />
                </label>
                <label className="cursor-pointer label">
                    <span className="label-text">Parking</span>
                    <input type="checkbox"  className="checkbox checkbox-success" />
                </label>
                <label className="cursor-pointer label">
                    <span className="label-text">Free WiFi</span>
                    <input type="checkbox" className="checkbox checkbox-success" />
                </label>
                <label className="cursor-pointer label">
                    <span className="label-text">Gym</span>
                    <input type="checkbox"  className="checkbox checkbox-success" />
                </label>
            </div>
            {/* Hotel Speaking Languages */}
            <div className="form-control w-[300px] my-5">
                <div className="text-2xl font-semibold mb-4">What is the hotel services?</div>
                <label className="cursor-pointer label">
                    <span className="label-text">English</span>
                    <input type="checkbox" defaultChecked className="checkbox checkbox-success" />
                </label>
                <label className="cursor-pointer label">
                    <span className="label-text">French</span>
                    <input type="checkbox"  className="checkbox checkbox-success" />
                </label>
                <label className="cursor-pointer label">
                    <span className="label-text">Arabic</span>
                    <input type="checkbox" defaultChecked className="checkbox checkbox-success" />
                </label>
                <label className="cursor-pointer label">
                    <span className="label-text">Espanol</span>
                    <input type="checkbox" className="checkbox checkbox-success" />
                </label>
            </div>
            {/* Location on the map */}
            <div>
                <div className="text-2xl font-semibold mb-4">What is your location information ?</div>
                <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text text-lg font-semibold my-3">Latitude</span>
                </div>
                <input type="text" placeholder="Type here" className="input input-bordered input-accent w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text text-lg font-semibold my-3">Longitude</span>
                </div>
                <input type="text" placeholder="Type here" className="input input-bordered input-accent w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text text-lg font-semibold my-3">Google map link</span>
                </div>
                <input type="text" placeholder="Type here" className="input input-bordered input-accent w-full max-w-xs" />
                </label>
            </div>
            {/* Contact Information */}
            <div>
                <div className="text-2xl font-semibold mt-5">Contact Information</div>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-lg font-semibold my-3">Phone Number:</span>
                    </div>
                    <input type="text" placeholder="Type here" className="input input-bordered input-accent w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-lg font-semibold my-3">Facebook Link:</span>
                    </div>
                    <input type="text" placeholder="Link here" className="input input-bordered input-accent w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-lg font-semibold my-3">Instagram Link:</span>
                    </div>
                    <input type="text" placeholder="Link here" className="input input-bordered input-accent w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-lg font-semibold my-3">X Link:</span>
                    </div>
                    <input type="text" placeholder="Link here" className="input input-bordered input-accent w-full max-w-xs" />
                </label>
            </div>
        </div>
        {/* Hotel Images */}
        <div>
            <h2 className='font-bold text-3xl text-center mb-10'>Hotel Images</h2>
            <ImageList variant="masonry" cols={3} gap={8}>
            {itemData.map((item) => (
                <ImageListItem key={item.img}>
                <img
                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=248&fit=crop&auto=format`}
                    alt={item.title}
                    loading="lazy"
                />
                </ImageListItem>
            ))}
            </ImageList>
            {/* About & Policy */}
            <div>
              {/* About */}
              <div>
                <h3 className='text-2xl font-semibold mb-5'>About</h3>
                <textarea className="textarea textarea-success w-full" placeholder="Write some words about your hotel"></textarea>
              </div>
              <div>
                <h3 className='text-2xl font-semibold mb-5'>Policy</h3>
                <textarea className="textarea textarea-success w-full" placeholder="Write some words about your hotel"></textarea>
              </div>
            </div>
        </div>
        
      </div>
      <div className='w-full flex justify-center items-center'><button className="btn btn-outline btn-success my-10">Register</button></div>
      
    </div>
  );
}

export default FrontDesk;
