import { createContext, useContext, useState } from 'react';

const HotelEmailContext = createContext();

export const HotelEmailProvider = ({ children }) => {
  const [hotelEmail, setHotelEmail] = useState("");

  const updateHotelEmail = (email) => {
    setHotelEmail(email);
  };

  return (
    <HotelEmailContext.Provider value={{ hotelEmail, updateHotelEmail }}>
      {children}
    </HotelEmailContext.Provider>
  );
};

export const useHotelEmail = () => useContext(HotelEmailContext);

export default HotelEmailContext;
