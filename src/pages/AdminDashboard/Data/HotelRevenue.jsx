import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../../Data/Firebase";

export async function updateHotelRevenue() {
    try {
        // Reference to the hotel document (replace 'ibis13@gmail.com' with your hotel document ID)
        const hotelRef = doc(collection(db, "hotelList", "Tlemcen", "hotels"), "ibis13@gmail.com");

        // Get the reservations data for the hotel
        const snapshot = await getDoc(hotelRef);
        const hotelData = snapshot.data();

        // Check if the hotel data and reservations array exist
        if (hotelData && hotelData.reservation) {
            const reservations = hotelData.reservation;

            // Initialize an empty object to store revenue for each month
            const revenueByMonth = {};

            // Iterate over the reservations and calculate revenue for each month
            reservations.forEach((reservation) => {
                const checkInDate = reservation.checkInDate.toDate();
                const totalPrice = reservation.totalPrice;

                // Extract the month from the check-in date
                const month = checkInDate.getMonth() + 1; // Months are zero-indexed, so add 1

                // Add the total price to the revenue for that month
                revenueByMonth[month] = (revenueByMonth[month] || 0) + totalPrice;
            });

            // Log or return the revenue by month object
            console.log("Revenue by Month:", revenueByMonth);
            return revenueByMonth;
        } else {
            console.log("No reservations data found for the hotel.");
            return null;
        }
    } catch (error) {
        console.error("Error updating hotel revenue:", error);
        return null;
    }
}

// Call the function to update the hotel revenue object
updateHotelRevenue();
