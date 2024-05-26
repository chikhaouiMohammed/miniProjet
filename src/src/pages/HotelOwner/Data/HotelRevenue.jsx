import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc } from 'firebase/firestore';
import PropTypes from 'prop-types'; // Import PropTypes
import { db } from '../../../Data/Firebase';
import { Line } from 'react-chartjs-2';
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

function HotelRevenue({ hotelEmail }) {
    const [revenueByMonth, setRevenueByMonth] = useState(null);

    useEffect(() => {
        async function fetchHotelRevenue() {
            try {
                const hotelRef = doc(collection(db, 'hotelList', 'Tlemcen', 'hotels'), hotelEmail);

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

                    // Transform the revenueByMonth object into an array of data points
                    const revenueData = Object.keys(revenueByMonth).map(month => ({
                        x: month,
                        y: revenueByMonth[month]
                    }));

                    // Set the revenue by month state
                    setRevenueByMonth(revenueData);
                } else {
                    console.log('No reservations data found for the hotel.');
                    setRevenueByMonth(null);
                }
            } catch (error) {
                console.error('Error updating hotel revenue:', error);
                setRevenueByMonth(null);
            }
        }

        // Fetch hotel revenue data when component mounts
        fetchHotelRevenue();
    }, [hotelEmail]);

    return (
        <div className="w-full">
        <h3 className="text-center text-black font-bold text-2xl">Hotel Revenue</h3>
            {revenueByMonth && <Line style={{ width: '90%', height: '500px' }} data={{ datasets: [{ data: revenueByMonth }] }} />}
        </div>
    );
}

HotelRevenue.propTypes = {
    hotelEmail: PropTypes.string.isRequired,
};

export default HotelRevenue;
