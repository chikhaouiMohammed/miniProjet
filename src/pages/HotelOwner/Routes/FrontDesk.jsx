import { ImageList, ImageListItem } from '@mui/material';
import React, { useState,useContext,useEffect } from 'react';
import { db } from "../../../Data/Firebase";
import { collection, doc, getDoc, getDocs, query, where,setDoc } from 'firebase/firestore';
import { AuthContext } from "../../../context/AuthContext";
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
function FrontDesk() {

  const [rating, setRating] = useState(3); 


  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value)); 
    
  };
  
  const [hotelInfo, setHotelInfo] = useState({
    name: '',
    mapLink: '',
    phoneNumber: '',
    facebookLink: '',
    instagramLink: '',
    xLink: '',
    abouy:'',
    policy:''
  });

  const [hotelImages, setHotelImages] = useState([]);
  const [businessFacilitiesImages, setBusinessFacilitiesImages] = useState([]);
  const [restaurentsImages, setRestaurentsImages] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const email = currentUser ? currentUser.email : '';
  console.log(email);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const hotelRef = doc(db, 'hotelList', 'Tlemcen', 'hotels', email);
        const hotelDoc = await getDoc(hotelRef);
        if (hotelDoc.exists()) {
          const data = hotelDoc.data();
        
          setHotelInfo(data);
          if (data && data.HotelImages) {
            const storage = getStorage();
            if (data.HotelImages['Internal&External']) {
              const imageUrls = data.HotelImages['Internal&External'];
              const internalExternalImages = await Promise.all(imageUrls.map(async (imageUrl) => {
                const imageRef = ref(storage, imageUrl);
                return getDownloadURL(imageRef);
              }));
              setHotelImages(internalExternalImages);
            }
            if (data.HotelImages['businessFacilities']) {
              const imageUrls = data.HotelImages['businessFacilities'];
              const businessFacilities = await Promise.all(imageUrls.map(async (imageUrl) => {
                const imageRef = ref(storage, imageUrl);
                return getDownloadURL(imageRef);
              }));
              setBusinessFacilitiesImages(businessFacilities);
            }
            if (data.HotelImages['restaurents']) {
              const imageUrls = data.HotelImages['restaurents'];
              const restaurents = await Promise.all(imageUrls.map(async (imageUrl) => {
                const imageRef = ref(storage, imageUrl);
                return getDownloadURL(imageRef);
              }));
              setRestaurentsImages(restaurents);
            }
          }
        } else {
          console.log('Hotel document not found');
        }
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    };

    if (email) {
      fetchHotelData();
    }
  }, [email]);
  
  const storage = getStorage();
  
const handleImageChange = async (e) => {
  const files = e.target.files;
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    try {
     
      const storageRef = ref(storage, `images/${currentUser.uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);

      
      const hotelRef = doc(db, 'hotelList', 'Tlemcen', 'hotels', currentUser.email);
      await setDoc(hotelRef, {
        HotelImages: {
          ...hotelInfo.HotelImages,
          [file.name]: imageUrl 
        }
      }, { merge: true }); // Merge the new data with existing data instead of overwriting

     
      setHotelImages((prevImages) => [...prevImages, imageUrl]);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }
};

const updateHotelData = async () => {
  try {
    const hotelRef = doc(db, 'hotelList', 'Tlemcen', 'hotels', email);
    await setDoc(hotelRef, {
      ...hotelInfo,
      About: document.getElementById('aboutTextarea').value, // Get the value of the about textarea
      Policy: document.getElementById('policyTextarea').value // Get the value of the policy textarea
    }, { merge: true }); // Merge the new data with existing data instead of overwriting
    console.log('Hotel data updated successfully!');
  } catch (error) {
    console.error('Error updating hotel data:', error);
  }
};

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
            <input type="text" placeholder="Type here" className="input input-bordered input-accent w-full max-w-xs" value={hotelInfo.name} onChange={(e) => setHotelInfo({ ...hotelInfo, name: e.target.value })}  />
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
                <div className="text-2xl font-semibold mb-4">What is the hotel  Languages ?</div>
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
                <input type="text" placeholder="Type here" className="input input-bordered input-accent w-full max-w-xs" value={hotelInfo.mapLink}onChange={(e) => setHotelInfo({ ...hotelInfo, mapLink: e.target.value })}  />
                </label>
            </div>
            {/* Contact Information */}
            <div>
                <div className="text-2xl font-semibold mt-5">Contact Information</div>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-lg font-semibold my-3">Phone Number:</span>
                    </div>
                    <input type="text" placeholder="Type here" className="input input-bordered input-accent w-full max-w-xs" value={hotelInfo.phone} onChange={(e) => setHotelInfo({ ...hotelInfo, phone: e.target.value })}  />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-lg font-semibold my-3">Facebook Link:</span>
                    </div>
                    <input type="text" placeholder="Link here" className="input input-bordered input-accent w-full max-w-xs " value={hotelInfo.facebook} onChange={(e) => setHotelInfo({ ...hotelInfo, facebook: e.target.value })} />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-lg font-semibold my-3">Instagram Link:</span>
                    </div>
                    <input type="text" placeholder="Link here" className="input input-bordered input-accent w-full max-w-xs"  value={hotelInfo.instagrame}onChange={(e) => setHotelInfo({ ...hotelInfo, instagrame: e.target.value })}  />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-lg font-semibold my-3">X Link:</span>
                    </div>
                    <input type="text" placeholder="Link here" className="input input-bordered input-accent w-full max-w-xs" value={hotelInfo.X_Link} onChange={(e) => setHotelInfo({ ...hotelInfo, X_Link: e.target.value })} />
                </label>
            </div>
        </div>
        {/* Hotel Images */}
        <div>
          
            <h2 className='font-bold text-3xl text-center mb-10'>Internal&External</h2>
            <ImageList variant="masonry" cols={3} gap={8}>
            {hotelImages.map((imageUrl, index) => (
              <ImageListItem key={index}>
                <img
                  src={imageUrl}
                  alt={`Hotel Image ${index + 1}`}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
          {/* Display business facilities images */}
          <h2 className='font-bold text-3xl text-center mb-10 mt-10'>Business Facilities Images</h2>
          <ImageList variant="masonry" cols={3} gap={8}>
            {businessFacilitiesImages.map((imageUrl, index) => (
              <ImageListItem key={index}>
                <img
                  src={imageUrl}
                  alt={`Business Facility Image ${index + 1}`}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
          {/* Display restaurents images */}
          <h2 className='font-bold text-3xl text-center mb-10 mt-10'>Restaurents Images</h2>
          <ImageList variant="masonry" cols={3} gap={8}>
            {restaurentsImages.map((imageUrl, index) => (
              <ImageListItem key={index}>
                <img
                  src={imageUrl}
                  alt={`Restaurent Image ${index + 1}`}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
            <input type="file" className="file-input file-input-bordered file-input-success w-full max-w-xs mt-8 mb-8 " onChange={handleImageChange}  />
            {/* About & Policy */}
            <div>
              {/* About */}
              <div>
                <h3 className='text-2xl font-semibold mb-5'>About</h3>
                <textarea id="aboutTextarea" className="textarea textarea-success w-full" placeholder="Write some words about your hotel" value={hotelInfo.About} ></textarea>
              </div>
              <div>
                <h3 className='text-2xl font-semibold mb-5'>Policy</h3>
                <textarea id="policyTextarea" className="textarea textarea-success w-full" placeholder="Write some words about your hotel" value={hotelInfo.Policy}></textarea>
              </div>
            </div>
        </div>
        
      </div>
      <div className='w-full flex justify-center items-center'><button className="btn btn-outline btn-success my-10"onClick={updateHotelData}  >Register</button></div>
      
    </div>
  );
}

export default FrontDesk;