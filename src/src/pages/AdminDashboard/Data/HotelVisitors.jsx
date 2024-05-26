import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { collection, doc, getDoc } from 'firebase/firestore';
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

function VisitorsByMonth({ hotelEmail }) {
  const [visitorsData, setVisitorsData] = useState(null);

  useEffect(() => {
    async function fetchVisitorsData() {
      try {
        const hotelRef = doc(collection(db, 'hotelList', 'Tlemcen', 'hotels'), hotelEmail);

        const snapshot = await getDoc(hotelRef);
        const hotelData = snapshot.data();

        if (hotelData && hotelData.reservation) {
          const reservations = hotelData.reservation;

          const visitorsPerMonth = {};

          reservations.forEach((reservation) => {
            const checkInDate = new Date(reservation.checkInDate.seconds * 1000);

            if (checkInDate.getFullYear() === 2024) {
              const month = checkInDate.getMonth();
              visitorsPerMonth[month] = (visitorsPerMonth[month] || 0) + 1;
            }
          });

          const months = Object.entries(visitorsPerMonth)
            .sort(([monthA], [monthB]) => monthA - monthB)
            .map(([month, count]) => ({
              month: new Date(0, month).toLocaleString('default', { month: 'long' }),
              count: count
            }));

          const labels = months.map(({ month }) => month);
          const data = months.map(({ count }) => count);

          const visitorsChartData = {
            labels: labels,
            datasets: [
              {
                label: "Visitors per month",
                data: data,
                fill: true,
              borderColor: '#1b60e0',
              borderWidth: 5,
              tension: 0.4,
              pointBackgroundColor: 'purple',
              pointBorderWidth: 5
              },
            ],
          };

          setVisitorsData(visitorsChartData);
        } else {
          console.log('No reservations data found for the hotel.');
          setVisitorsData(null);
        }
      } catch (error) {
        console.error('Error getting visitors per month:', error);
        setVisitorsData(null);
      }
    }

    fetchVisitorsData();
  }, [hotelEmail]);

  return (
    <div className="w-full">
      <h3 className="text-center text-black font-bold text-2xl">Visitors by Month</h3>
      {visitorsData && <Line style={{ width: '90%', height: '500px' }} data={visitorsData} />}
    </div>
  );
}

// Add PropTypes validation for hotelEmail
VisitorsByMonth.propTypes = {
  hotelEmail: PropTypes.string.isRequired,
};

export default VisitorsByMonth;
