import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../Data/Firebase';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function TopCountries({ hotelEmail }) {
    const [topCountryData, setTopCountryData] = useState(null);

    useEffect(() => {
        async function fetchTopCountryData() {
            try {
                const hotelRef = await doc(collection(db, 'hotelList', 'Tlemcen', 'hotels'), hotelEmail);

                // Get the reservations data for the hotel
                const snapshot = await getDoc(hotelRef);
                const hotelData = snapshot.data();

                // Check if the hotel data and reservations array exist
                if (hotelEmail && hotelData && hotelData.reservation) {
                    const reservations = hotelData.reservation;

                    // Initialize an empty object to store the count of each country
                    const countryCount = {};

                    // Iterate over the reservations and count the occurrences of each country
                    reservations.forEach((reservation) => {
                        const country = reservation.country ;
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

                    // Update the TopCountry object with the new labels and data
                    const TopCountry = {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Top Countries',
                                data: data,
                                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                                borderColor: ['rgba(54, 162, 235, 1)'],
                                borderWidth: 1,
                            },
                        ],
                    };

                    // Set the TopCountry data state
                    setTopCountryData(TopCountry);
                } else {
                    console.log('No reservations data found for the hotel.');
                    setTopCountryData(null);
                }
            } catch (error) {
                console.error('Error updating TopCountry:', error);
                setTopCountryData(null);
            }
        }

        // Fetch top country data when component mounts
        fetchTopCountryData();
    }, [hotelEmail]);

    return (
        <div className="w-full">
            <h3 className="text-center text-black font-bold text-2xl">Top Countries</h3>
            {topCountryData && <Bar style={{ width: '90%', height: '500px' }} data={topCountryData} />}
        </div>
    );
}

// Add PropTypes validation for hotelEmail
TopCountries.propTypes = {
    hotelEmail: PropTypes.string.isRequired,
};

export default TopCountries;
