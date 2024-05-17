import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../../Data/Firebase";


export async function getVisitorsPerMonth() {
  try {
    // Reference to the hotel document (replace 'ibis13@gmail.com' with your hotel document ID)
    const hotelRef = doc(collection(db, "hotelList", "Tlemcen", "hotels"), "renaissance13@gmail.com");

    // Get the reservations data for the hotel
    const snapshot = await getDoc(hotelRef);
    const hotelData = snapshot.data();

    if (hotelData && hotelData.reservation) {
      const reservations = hotelData.reservation;

      // Initialize an empty object to store the count of visitors per month
      const visitorsPerMonth = {};

      // Iterate over the reservations and count the occurrences of each month
      reservations.forEach((reservation) => {
        const checkInDate = new Date(reservation.checkInDate.seconds * 1000);

        // Check if the year is 2024
        if (checkInDate.getFullYear() === 2024) {
          const month = checkInDate.getMonth();
          // Increment the count for the month or initialize it to 1 if it doesn't exist
          visitorsPerMonth[month] = (visitorsPerMonth[month] || 0) + 1;
        }
      });

      // Convert the visitorsPerMonth object into an array of objects
      const months = Object.entries(visitorsPerMonth)
        // Sort the months based on the index (0-11)
        .sort(([monthA], [monthB]) => monthA - monthB)
        // Map the months to their names
        .map(([month, count]) => ({
          month: new Date(0, month).toLocaleString('default', { month: 'long' }),
          count: count
        }));

      // Log or return the updated visitorsPerMonth object
      console.log("Visitors per month:", months);
      return months;
    } else {
      console.log("No reservations data found for the hotel.");
      return null;
    }
  } catch (error) {
    console.error("Error getting visitors per month:", error);
    return null;
  }
}

// Call the function to get the visitors per month for the year 2024
getVisitorsPerMonth();