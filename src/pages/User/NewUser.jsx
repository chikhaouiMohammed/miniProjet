import {useEffect,  useState } from "react";
import { addDoc, collection, doc,  getDocs,where,query } from "firebase/firestore"; 

import {db} from '../../Data/Firebase'
import { useNavigate } from "react-router-dom";

const NewUser = () => {

  const [UserName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [dateofbirth, setDateofbirth] = useState('');
  const [country, setCountry] = useState('');
  const [Age, setAge] = useState('');
  const [roomType, setRoomType] = useState('');
  const navigate = useNavigate();

  const handleUserNameChange = (event) => {
    setUserName(event.target.value); 
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value); 
  };
  const handleDateChange = (event) => {
    setDateofbirth(event.target.value); 
  };
  const handleCountryChange = (event) => {
    setCountry(event.target.value); 
  };
  const handleAgeChange = (event) => {
    setAge(event.target.value); 
  };
  const handleRoomTypeChange = (event) => {
    setRoomType(event.target.value); 
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "users"), {
        UserName,
        email,
        dateofbirth,
        country,
        Age,
        roomType
      });
      console.log("Document successfully written!");
      // Clear the form after submission if needed
      setUserName('');
      setEmail('');
      setDateofbirth('');
      setCountry('');
      setAge('');
      setRoomType('');
      navigate(-1)
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };
  
//   useEffect(() => {
//     const handleData = async () => {
//         const hotelsCollectionRef = collection(db, 'hotelList', 'Tlemcen', 'hotels');
//         const querySnapshot = await getDocs(query(hotelsCollectionRef, where('email', '==', email)));

//         if (!querySnapshot.empty) {
//             // Loop through the documents if needed
//             querySnapshot.forEach(doc => {
//                 console.log(doc.id, ' => ', doc.data());
//             });
//         } else {
//             console.log("No documents found");
//         }
//     };
//     handleData();
// }, [email]);

  
  

  


  
  return (
    <form onSubmit={handleAdd}  className="w-full max-w-lg mx-auto mt-36">
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full md:w-1/2 px-3 mb-6">
        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
        <input type="text"
          id="username"
          name="username"
          onChange={handleUserNameChange} 
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " />
      </div>
      <div className="w-full md:w-1/2 px-3 mb-6">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input type="email" id="email" name="email" onChange={handleEmailChange}  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
    </div>
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full md:w-1/2 px-3 mb-6">
        <label htmlFor="dateOfBirth" className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
        <input type="date" id="dateOfBirth" name="dateOfBirth" onChange={handleDateChange}   className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="w-full md:w-1/2 px-3 mb-6">
        <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">Country</label>
        <input type="text" id="country" name="country" onChange={handleCountryChange}   className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="w-full md:w-1/2 px-3 mb-6">
        <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">Age</label>
        <input type="text" id="age" name="age" onChange={handleAgeChange}   className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
    </div>
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full px-3 mb-6">
        <label htmlFor="roomType" className="block text-gray-700 text-sm font-bold mb-2">Room Type</label>
        <select id="roomType" name="roomType" onChange={handleRoomTypeChange}  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="">Select Room Type</option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Triple">Triple</option>
          <option value="Vip">Vip</option>
        </select>
      </div>
    </div>
    <div className="flex justify-center">
      <button type="submit" className="bg-mainColor text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create Booking</button>
    </div>
  </form>
  )
}

export default NewUser