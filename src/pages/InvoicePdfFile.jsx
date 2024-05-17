import { Page, Text, Document, StyleSheet, Font } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";

const InvoicePdfFile = () => {
  const { state } = useLocation();
  const hotelName = state.hotelName;
  const checkIn = new Date(state.checkInDate.$d).toDateString(); // Format the check-in date
  const checkOut = new Date(state.checkOutDate.$d).toDateString(); // Format the check-out date
  const rooms = state.rooms;
  const fullName = state.fullName;
  const phone = state.phone;
  const country = state.country;
  const cardDetails = state.cardDetails;
  const subTotal = state.totalPrice;

  console.log(checkIn); // This will now log the formatted date

  // Function to generate a random 6-digit number
  const generateRandomNumber = () => {
    return Math.floor(100000 + Math.random() * 900000); // Generates a random number between 100000 and 999999
  };

  Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
  });

  const styles = StyleSheet.create({
    body: {
      padding: '40px 200px',
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      fontSize: 52,
      textAlign: 'end',
      textTransform: 'uppercase',
      fontFamily: 'Oswald',
      fontWeight: 'bold',
    },
    author: {
      fontSize: 25,
      textAlign: 'end',
      marginBottom: 8,
      color: '#FF5733',
      fontWeight: 700
    },
    paymentDetails: {
      fontSize: 32,
      textAlign: 'start',
      marginBottom: 8,
      color: '#FF5733',
      fontWeight: 700
    },
    hotelName: {
      fontSize: 26,
      textAlign: 'end',
      marginBottom: 30,
      color: 'black',
      fontWeight: 400,
      letterSpacing: 5
    },
    roomTableHeading: {
      fontSize: 26,
      textAlign: 'end',
      marginBottom: 30,
      color: 'black',
      fontWeight: 700,
      letterSpacing: 5
    },
    roomTableBody: {
      fontSize: 26,
      textAlign: 'end',
      marginBottom: 30,
      color: '#696766',
      fontWeight: 500,
      letterSpacing: 5
    },
    subTotal: {
      fontSize: 26,
      textAlign: 'end',
      marginBottom: 80,
      color: '#696766',
      fontWeight: 500,
      letterSpacing: 5
    },
    paymentInfo: {
      fontSize: 24,
      textAlign: 'start',
      marginBottom: 10,
      color: '#696766',
      fontWeight: 500,
      letterSpacing: 4
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
      fontFamily: 'Oswald'
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: 'justify',
      fontFamily: 'Times-Roman'
    },
    header: {
      fontSize: 18,
      textAlign: 'center',
      color: 'red',
      fontWeight: 500
    },
    invoiceDetailsBox: {
      padding: '25px 15px',
      backgroundColor: '#ffbcad',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'start',
      gap: 2
    },
    roomsBox: {
      padding: '23px 93px 0 13px',
      backgroundColor: '#ffbcad',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 'fit-content',
    },
    roomsBoxBody: {
      padding: '23px 93px 0 13px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 'fit-content',
    },
    billTo: {
      fontSize: 25,
      textAlign: 'start',
      margin: '10px 0 20px 0',
      color: '#FF5733',
      fontWeight: 700
    },
    billInfo: {
      fontSize: 22,
      textAlign: 'start',
      margin: '7px 0',
      fontWeight: 500
    },
    CheckDate: {
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',
      gap: 10
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
  });

  const randomNumber = generateRandomNumber(); // Generate a random number
  const date = new Date().toLocaleDateString(); // Get current date in string format

  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Text style={styles.header} fixed>
          Download This Pdf is Mandatory
        </Text>
        <Text style={styles.title}>invoice</Text>
        <Text style={styles.author}>STATRAVEL</Text>
        <Text style={styles.hotelName}>{hotelName}</Text>
        <Text style={styles.invoiceDetailsBox}>
          <Text style={styles.author}>Invoice No#. {randomNumber}</Text>
          <Text style={styles.hotelName}>Invoice Date: {date}</Text>
        </Text>
        <Text style={styles.billTo}>BILL TO</Text>
        <Text style={styles.billInfo}>Full Name: {fullName}</Text>
        <Text style={styles.billInfo}>Phone Number: {phone}</Text>
        <Text style={styles.billInfo}>Country: {country}</Text>
        <Text style={styles.billInfo}>Card Number: </Text>
        {/* Check In */}
        <Text style={styles.CheckDate}>
          <Text style={styles.billTo}>Check In</Text>
          <Text style={styles.billInfo}>{checkIn}</Text> {/* Use formatted check-in date */}
        </Text>
        {/* Check Out */}
        <Text style={styles.CheckDate}>
          <Text style={styles.billTo}>Check Out</Text>
          <Text style={styles.billInfo}>{checkOut}</Text> {/* Use formatted check-out date */}
        </Text>
        {/* Payed Rooms */}
        <Text style={styles.roomsBox}>
          <Text style={styles.roomTableHeading}>QTY</Text>
          <Text style={styles.roomTableHeading}>DESCRIPTION</Text>
          <Text style={styles.roomTableHeading}>PRICE</Text>
        </Text>
        {rooms.map((room) => (
          <Text key={room} style={styles.roomsBoxBody}>
            <Text style={styles.roomTableBody}>{room.count}</Text>
            <Text style={styles.roomTableBody}>{room.name} room</Text>
            <Text style={styles.roomTableBody}>{room.price} DZD</Text>
          </Text>
        ))}
        <hr style={{ height: 5, backgroundColor: '#FF5733', marginBottom: 25 }} />
        <Text style={styles.subTotal}>Subtotal: {subTotal} DZD</Text>
        <Text style={styles.paymentDetails}>Payment Details</Text>
        <Text style={styles.paymentInfo}>Full Name on the card: {cardDetails.cardHolderName}</Text>
        <Text style={styles.paymentInfo}>Card number: {cardDetails.cardNumber}</Text>
        <Text style={styles.paymentInfo}>Exp date: {cardDetails.expDate}</Text>
        <Text style={styles.paymentInfo}>Cvc: ***</Text>
      </Page>
    </Document>
  );
};

export default InvoicePdfFile;
