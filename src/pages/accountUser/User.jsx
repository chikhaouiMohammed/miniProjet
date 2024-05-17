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
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";




  export default function User() {

    const { currentUser } = useContext(AuthContext);
    const email = currentUser ? currentUser.email : '';
    console.log(email)
  


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


const storage = getStorage();


const handleImageChange = async (e) => {
  const file = e.target.files[0];

  try {
    if (!file) {
      console.error('No file selected.');
      return;
    }

    if (!email) {
      console.error('No user logged in.');
      return;
    }

    const guestUsersRef = collection(db, 'guestUsers');
    const guestUserQuery = query(guestUsersRef, where('email', '==', email));

    const hotelUsersRef = collection(db, 'hotelUsers');
    const hotelUserQuery = query(hotelUsersRef, where('email', '==', email));

    const adminRef = collection(db, 'Admin');
    const adminQuery = query(adminRef, where('email', '==', email));

    let userSnapshot;

    // Check if user exists in guestUsers collection
    userSnapshot = await getDocs(guestUserQuery);
    if (userSnapshot.size === 1) {
      // User found in guestUsers collection
      const storageRef = ref(storage, `profile_images/${email}/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Update the image field in the document
      await updateDoc(userSnapshot.docs[0].ref, { image: downloadURL });

      return;
    }

    // Check if user exists in hotelUsers collection
    userSnapshot = await getDocs(hotelUserQuery);
    if (userSnapshot.size === 1) {
      const storageRef = ref(storage, `profile_images/${email}/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
    // Update the image field in the document
    await updateDoc(userSnapshot.docs[0].ref, { image: downloadURL });
    }

    // Check if user exists in Admin collection
    userSnapshot = await getDocs(adminQuery);
    if (userSnapshot.size === 1) {
      
      const storageRef = ref(storage, `profile_images/${email}/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      // Update the image field in the document
      await updateDoc(userSnapshot.docs[0].ref, { image: downloadURL });
    }

    console.log('Image uploaded successfully.');
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};



const [UserInfo, setUserInfo] = useState({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  profileImageUrl: '', // New field for storing profile image URL
});
const [userCollection, setUserCollection] = useState(null); // State for storing user collection reference

useEffect(() => {
  const fetchUserData = async () => {
    try {
      if (!email) {
        console.log("No user login");
        return;
      }

      const guestUsersRef = collection(db, 'guestUsers');
      const guestUserQuery = query(guestUsersRef, where('email', '==', email));

      const hotelUsersRef = collection(db, 'hotelUsers');
      const hotelUserQuery = query(hotelUsersRef, where('email', '==', email));

      const adminRef = collection(db, 'Admin');
      const adminQuery = query(adminRef, where('email', '==', email));

      let userSnapshot;

      // Check if user exists in guestUsers collection
      userSnapshot = await getDocs(guestUserQuery);
      if (userSnapshot.size === 1) {
        // User found in guestUsers collection
        const userData = userSnapshot.docs[0].data();
        setUserInfo({ ...userData, profileImageUrl: userData.image });
        setUserCollection(guestUsersRef); // Set user collection reference
        return;
      }

      // Check if user exists in hotelUsers collection
      userSnapshot = await getDocs(hotelUserQuery);
      if (userSnapshot.size === 1) {
        // User found in hotelUsers collection
        const userData = userSnapshot.docs[0].data();
        setUserInfo({ ...userData, profileImageUrl: userData.image });
        setUserCollection(hotelUsersRef); // Set user collection reference
        return;
      }

      // Check if user exists in Admin collection
      userSnapshot = await getDocs(adminQuery);
      if (userSnapshot.size === 1) {
        // User found in Admin collection
        const userData = userSnapshot.docs[0].data();
        setUserInfo({ ...userData, profileImageUrl: userData.image });
        setUserCollection(adminRef); // Set user collection reference
        return;
      }

      console.log('User not found in any collection');
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  fetchUserData();
}, [email]);







    return (
      <div className="user font-poppins">

        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
            <img
            src={UserInfo.image || "https://via.placeholder.com/150"}
            alt=""
            className="w-12 h-12 rounded-full object-cover"
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
                <span className="userShowInfoTitle">Algeria | Tlemcen</span>
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

              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                <img
                      className="userUpdateImg"
                      src={UserInfo.image || "https://via.placeholder.com/150"}
                      alt=""
                    />
                  <label htmlFor="file">
                    <PublishIcon className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} onChange={handleImageChange}   />
                </div>
                <button type="submit" className="userUpdateButton bg-mainColor mt-10">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }