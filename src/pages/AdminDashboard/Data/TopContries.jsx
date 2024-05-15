import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../../Data/Firebase";

export async function updateTopCountry() {
    try {
        // Reference to the hotel document (replace 'ibis13@gmail.com' with your hotel document ID)
        const hotelRef = doc(collection(db, "hotelList", "Tlemcen", "hotels"), "renaissance13@gmail.com");

        // Get the reservations data for the hotel
        const snapshot = await getDoc(hotelRef) ;
        const hotelData = snapshot.data();

        // Check if the hotel data and reservations array exist
        if (hotelData && hotelData.reservation) {
            const reservations = hotelData.reservation;

            // Initialize an empty object to store the count of each country
            const countryCount = {};

            // Iterate over the reservations and count the occurrences of each country
            reservations.forEach((reservation) => {
                const country = reservation.country;
                // Increment the count for the country or initialize it to 1 if it doesn't exist
                countryCount[country] = (countryCount[country] || 0) + 1;
            });

            // Convert the countryCount object into an array of objects
            const sortedCountries = Object.entries(countryCount)
                // Sort the countries based on the count in descending order
                .sort(([, countA], [, countB]) => countB - countA)
                // Take the top five countries
                .slice(0, 5);

            // Extract the country names and counts from the sorted array
            const labels = sortedCountries.map(([country]) => country);
            const data = sortedCountries.map(([, count]) => count);
            console.log("From Top Contries" + data)

            // Update the TopCountry object with the new labels and data
            const TopCountry = {
                labels: labels,
                datasets: [
                    {
                        label: "Top Countries",
                        data: data,
                        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                        borderColor: ['rgba(54, 162, 235, 1)'],
                        borderWidth: 1
                    }
                ]
            };

            // Log or return the updated TopCountry object
            console.log(TopCountry);
            return TopCountry;
        } else {
            console.log("No reservations data found for the hotel.");
            return null;
        }
    } catch (error) {
        console.error("Error updating TopCountry:", error);
        return null;
    }
}

// Call the function to update the TopCountry object
updateTopCountry();