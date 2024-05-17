import React, { useState,useContext,useEffect } from 'react';
import { db } from "../../../Data/Firebase";
import { collection, doc, getDoc, getDocs, query, where,setDoc,deleteField,deleteDoc,updateDoc } from 'firebase/firestore';
import { AuthContext } from "../../../context/AuthContext";
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';


function RoomTypes() {
  
  const { currentUser } = useContext(AuthContext);
  const email = currentUser ? currentUser.email : '';

  const [roomTypes, setRoomTypes] = useState([]);
  const [roomTypeName, setRoomTypeName] = useState('');
  const [roomTypePrice, setRoomTypePrice] = useState('');
  const [roomTypeImage, setRoomTypeImage] = useState(null);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const hotelRef = doc(db, 'hotelList', 'Tlemcen', 'hotels', email);
        const hotelDoc = await getDoc(hotelRef);

        if (hotelDoc.exists()) {
          const roomTypeData = hotelDoc.data().roomType;
          const roomTypesArray = [];
          for (const roomTypeName in roomTypeData) {
            const roomType = roomTypeData[roomTypeName];
            const firstImage = roomType.images[0];
            roomTypesArray.push({
              name: roomTypeName,
              price: roomType.price,
              image: firstImage
            });
          }
          setRoomTypes(roomTypesArray);
        }
      } catch (error) {
        console.error('Error fetching room types:', error);
      }
    };

    fetchRoomTypes();
  }, [email]);
  const handleImageUpload = async () => {
    try {
      
  
      const storageRef = ref(getStorage(), 'roomTypeImages/' + roomTypeImage.name);
      await uploadBytes(storageRef, roomTypeImage);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error; // Rethrow the error so it can be caught in the handleRegister function
    }
  };

const handleRegister = async () => {
  try {
    const imageUrl = await handleImageUpload();

    // Add new room type data to Firestore
    const hotelRef = doc(db, 'hotelList', 'Tlemcen', 'hotels', email);
    await setDoc(hotelRef, {
      roomType: {
        [roomTypeName]: {
          price: roomTypePrice,
          images: [imageUrl]
        }
      }
    }, { merge: true });

    // Fetch updated room types data from Firestore
    const updatedHotelDoc = await getDoc(hotelRef);
    if (updatedHotelDoc.exists()) {
      const updatedRoomTypeData = updatedHotelDoc.data().roomType;
      const updatedRoomTypesArray = [];
      for (const roomTypeName in updatedRoomTypeData) {
        const roomType = updatedRoomTypeData[roomTypeName];
        const firstImage = roomType.images[0];
        updatedRoomTypesArray.push({
          name: roomTypeName,
          price: roomType.price,
          image: firstImage
        });
      }
      setRoomTypes(updatedRoomTypesArray);



      
    }

    // Reset form fields
    setRoomTypeName('');
    setRoomTypePrice('');
    setRoomTypeImage(null);
  } catch (error) {
    console.error('Error registering room type:', error);
  }
};

const handleDeleteRoom = async (roomToDelete) => {
  try {
    const hotelRef = doc(db, 'hotelList', 'Tlemcen', 'hotels', email);
    const hotelDoc = await getDoc(hotelRef);

    if (hotelDoc.exists()) {
      const updatedRoomTypeData = { ...hotelDoc.data().roomType }; // Create copy to avoid mutation
      delete updatedRoomTypeData[roomToDelete.name]; // Delete the room from the object

      // Update Firestore with the modified room type data
      await updateDoc(hotelRef, { roomType: updatedRoomTypeData });

      // Update the local state to reflect the deletion
      const updatedRoomTypes = roomTypes.filter(roomType => roomType.name !== roomToDelete.name);
      setRoomTypes(updatedRoomTypes);

      console.log('Room deleted successfully!');
    } else {
      console.error('Hotel document not found in Firestore.');
    }
  } catch (error) {
    console.error('Error deleting room:', error);
  }
};


  return (
      <div className="font-poppins w-full p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roomTypes.map(roomType => (
            <div key={roomType.name} className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
              <img src={roomType.image} className="w-full h-64 object-cover" alt={roomType.name} />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{roomType.name}</h3>
                <p className="text-gray-500 mb-2">{roomType.price}</p>
                <button className="btn btn-outline btn-error" onClick={() => handleDeleteRoom(roomType)} >Delete</button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h3 className="font-bold text-3xl mt-10 mb-10">Add New Room</h3>
        </div>
        <div className='flex space-x-20'>
          <label className="form-control w-full max-w-xs my-5">
            <div className="label">
              <span className="label-text text-2xl font-semibold mb-3">Room Type Name :</span>
            </div>
            <input type="text" placeholder="Type here" className="input input-bordered input-accent w-full max-w-xs" value={roomTypeName} onChange={e => setRoomTypeName(e.target.value)} />
          </label>
          <label className="form-control w-full max-w-xs my-5">
            <div className="label">
              <span className="label-text text-2xl font-semibold mb-3">Room Price :</span>
            </div>
            <input type="text" placeholder="Type here" className="input input-bordered input-accent w-full max-w-xs" value={roomTypePrice} onChange={e => setRoomTypePrice(e.target.value)} />
          </label>
          <label className="form-control w-full max-w-xs my-5">
            <div className="label">
              <span className="label-text text-2xl font-semibold mb-3">Upload Image :</span>
            </div>
            <input type="file" className="file-input file-input-bordered file-input-success w-full max-w-xs" onChange={e => setRoomTypeImage(e.target.files[0])} />
          </label>
        </div>
        <div className='w-full flex justify-center items-center'>
          <button className="btn btn-outline btn-success my-10" onClick={handleRegister}>Register</button>
        </div>
      </div>
    );
  }
  

export default RoomTypes;