import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PublishIcon from '@mui/icons-material/Publish';
import "./User.css";
import { db } from "../../Data/Firebase";
import { collection, doc, getDoc, getDocs, query, where ,updateDoc} from 'firebase/firestore';
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect,useState } from "react";





  export default function User() {

    const { currentUser } = useContext(AuthContext);
    const email = currentUser ? currentUser.email : '';
    console.log(email)
  
    const [UserInfo, setUserInfo] = useState({
      FirstName: '',
      LasetName: '',
      Email: '',
      Password: '',
    });
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          if (!email) {
           console.log("no user login") // No user logged in, handle accordingly
            return;
          }
  
          const guestUsersRef = collection(db, 'guestUsers');
          const guestUserQuery = query(guestUsersRef, where('email', '==', email));
  
          const hotelUsersRef = collection(db, 'hotelUsers');
          const hotelUserQuery = query(hotelUsersRef, where('email', '==', email));

          const adminRef = collection(db, 'Admin');
          const adminQuery = query(adminRef, where('email', '==', email));
  
          const guestUserSnapshot = await getDocs(guestUserQuery);
          if (guestUserSnapshot.size === 1) {
            // User is a guest
            setUserInfo(guestUserSnapshot.docs[0].data());
            return;
          }
  
          const hotelUserSnapshot = await getDocs(hotelUserQuery);
          if (hotelUserSnapshot.size === 1) {
            // User is a hotel owner or secretary
            setUserInfo(hotelUserSnapshot.docs[0].data());
            return;
          }
          const adminSnapshot = await getDocs(adminQuery)
          if(adminSnapshot.size === 1){
            // user is a Admin
            setUserInfo(adminSnapshot.docs[0].data());
            return;
          }
  
          // No user found in the above collections
          console.log('User not found in guestUsers or hotelUsers ot Admin collection');
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchUserData();
    }, [email]);

const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    if (!email) {
      console.log("No user login"); 
      return;
    }

    const guestUsersRef = collection(db, 'guestUsers');
    const hotelUsersRef = collection(db, 'hotelUsers');
    const adminRef = collection(db, 'Admin');

    const userRef = await getDocs(query(guestUsersRef, where('email', '==', email)));
    if (!userRef.empty) {
      await updateDoc(doc(db, 'guestUsers', userRef.docs[0].id), UserInfo);
      console.log("Guest user updated successfully!");
      return;
    }

    const hotelUserRef = await getDocs(query(hotelUsersRef, where('email', '==', email)));
    if (!hotelUserRef.empty) {
      await updateDoc(doc(db, 'hotelUsers', hotelUserRef.docs[0].id), UserInfo);
      console.log("Hotel user updated successfully!");
      return;
    }

    const adminUserRef = await getDocs(query(adminRef, where('email', '==', email)));
    if (!adminUserRef.empty) {
      await updateDoc(doc(db, 'Admin', adminUserRef.docs[0].id), UserInfo);
      console.log("Admin user updated successfully!");
      return;
    }

    console.log("User not found in any collection.");
  } catch (error) {
    console.error("Error updating user:", error);
  }
};



    return (
      <div className="user font-poppins">
       
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className=" w-12 h-12 rounded-full object-cover"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername font-semibold text-xl">{UserInfo.firstName}</span>
                <span className="userShowUserTitle font-normal ">{UserInfo.lastName}</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentityIcon className="userShowIcon" />
                <span className="userShowInfoTitle" >{UserInfo.lastName}</span>
              </div>
              <div className="userShowInfo">
                <CalendarMonthIcon className="userShowIcon" />
                <span className="userShowInfoTitle">10.12.1999</span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroidIcon className="userShowIcon" />
                <span className="userShowInfoTitle">+1 123 456 67</span>
              </div>
              <div className="userShowInfo">
                <MailOutlineIcon className="userShowIcon" />
                <span className="userShowInfoTitle"  >{UserInfo.email}</span>
              </div>
              <div className="userShowInfo">
                <LocationSearchingIcon className="userShowIcon" />
                <span className="userShowInfoTitle">New York | USA</span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="font-bold text-2xl ">Edit</span>
            <form className="userUpdateForm" onSubmit={handleUpdate}>
              <div className="flex flex-col gap-10  ">
    

<label className="input input-bordered flex items-center gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
  <input type="text" className="grow" placeholder="" value={UserInfo.firstName}  onChange={(e) => setUserInfo({ ...UserInfo, firstName: e.target.value })} />
</label>
<label className="input input-bordered flex items-center gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
  <input type="text" className="grow" placeholder="" value={UserInfo.lastName} onChange={(e) => setUserInfo({ ...UserInfo, lastName: e.target.value })}   />
</label>
<label className="input input-bordered flex items-center gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
  <input type="text" className="grow" placeholder="" value={UserInfo.email} onChange={(e) => setUserInfo({ ...UserInfo, email: e.target.value })}  />
</label>
<label className="input input-bordered flex items-center gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
  <input type="password" className="grow" value={UserInfo.password} onChange={(e) => setUserInfo({ ...UserInfo, password: e.target.value })}  />
</label>
               
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                  />
                  <label htmlFor="file">
                    <PublishIcon className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button type="submit" className="userUpdateButton bg-mainColor">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }