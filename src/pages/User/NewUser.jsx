import { useContext, useEffect, useState } from "react";
import { addDoc, collection, doc, getDocs, where, query, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore"; 
import { db } from '../../Data/Firebase'
import { useNavigate } from "react-router-dom";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { useReservation } from "../../context/ReservationDataContext";

const NewUser = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [country, setCountry] = useState('');
  const [roomType, setRoomType] = useState('');
  const [doubleCount, setDoubleCount] = useState(0);
  const [standardCount, setStandardCount] = useState(0);
  const [familyCount, setFamilyCount] = useState(0);
  const [suiteCount, setSuiteCount] = useState(0);
  const [hotelEmail, setHotelEmail] = useState('');
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const secretrEmail = currentUser ? currentUser.email : '';
  const { setReservationData } = useReservation();

  console.log(secretrEmail)

  useEffect(() => {
    const fetchHotelUserId = async () => {
      try {
        const hotelUsersRef = collection(db, 'hotelUsers');
        const hotelUsersQuery = query(hotelUsersRef, where('secreter.email', '==', currentUser.email));
        const hotelUsersSnapshot = await getDocs(hotelUsersQuery);
        if (!hotelUsersSnapshot.empty) {
          const hotelUserDoc = hotelUsersSnapshot.docs[0];
          setHotelEmail(hotelUserDoc.id);
        }
      } catch (error) {
        console.error("Error fetching hotel user ID:", error);
      }
    };

    fetchHotelUserId();
  }, [currentUser.email]);

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
  };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const reservation = {
      fullName,
      email,
      hotelEmail,
      checkInDate: checkInDate.$d,
      checkOutDate: checkOutDate.$d,
      country,
      roomType,
      doubleCount,
      standardCount,
      familyCount,
      suiteCount
    };
  
    try {
      const hotelDocRef = doc(collection(db, "hotelList", "Tlemcen", "hotels"), hotelEmail);
      
     
      const hotelDocSnap = await getDoc(hotelDocRef);
      if (hotelDocSnap.exists()) {
        const hotelData = hotelDocSnap.data();
        
        // Check if the reservation array already exists
        if (hotelData.reservation) {
          // If the reservation array exists, add the new reservation to it
          await updateDoc(hotelDocRef, {
            reservation: [...hotelData.reservation, reservation]
          });
        } else {
          // If the reservation array doesn't exist yet, create a new one with the reservation
          await setDoc(hotelDocRef, { reservation: [reservation] }, { merge: true });
        }
        setReservationData(reservation);
        dispatch({ type: "LOGIN", payload: { user: reservation, role: "guest", email: currentUser.email } }); 
        navigate('/payment', { state: { reservation: reservation } });

      } else {
        console.error("Hotel document does not exist!");
      }
    } catch (error) {
      console.error("Error adding reservation:", error);
    }
  };
  

  return (
    <div className="bg-white py-32 flex justify-center items-center w-full h-full ">
      <form onSubmit={handleAdd} className="flex justify-center items-center gap-10 flex-col w-[400px]">
        <label className="input input-bordered flex items-center gap-2 w-full">
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" />
        </label>
        <div className='w-full'>
          <Box sx={{width:'100%'}}>
            <LocalizationProvider  dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker label="Check in date" onChange={handleCheckInDateChange} />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </div>
        <div className='w-full'>
          <Box sx={{width:'100%'}}>
            <LocalizationProvider  dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker label="Check out date" onChange={handleCheckOutDateChange} />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </div>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" />
        </label>
        <h2 className="text-[25px] font-bold text-black">Room Selected</h2>
        <div className="flex justify-center items-center gap-4">
          <h3 className="font-bold text-xl">Standard</h3>
          <div><span className="cursor-pointer p-5 font-semibold text-3xl" onClick={() => setStandardCount(standardCount - 1)}>-</span><span className="text-[22px]">{standardCount}</span><span className="cursor-pointer p-5 font-semibold text-3xl" onClick={() => setStandardCount(standardCount + 1)}>+</span></div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <h3 className="font-bold text-xl">Double</h3>
          <div><span className="cursor-pointer p-5 font-semibold text-3xl" onClick={() => setDoubleCount(doubleCount - 1)}>-</span><span className="text-[22px]">{doubleCount}</span><span className="cursor-pointer p-5 font-semibold text-3xl" onClick={() => setDoubleCount(doubleCount + 1)}>+</span></div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <h3 className="font-bold text-xl">Family</h3>
          <div><span className="cursor-pointer p-5 font-semibold text-3xl" onClick={() => setFamilyCount(familyCount - 1)}>-</span><span className="text-[22px]">{familyCount}</span><span className="cursor-pointer p-5 font-semibold text-3xl" onClick={() => setFamilyCount(familyCount + 1)}>+</span></div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <h3 className="font-bold text-xl">Suite</h3>
          <div><span className="cursor-pointer p-5 font-semibold text-3xl" onClick={() => setSuiteCount(suiteCount - 1)}>-</span><span className="text-[22px]">{suiteCount}</span><span className="cursor-pointer p-5 font-semibold text-3xl" onClick={() => setSuiteCount(suiteCount + 1)}>+</span></div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default NewUser;
