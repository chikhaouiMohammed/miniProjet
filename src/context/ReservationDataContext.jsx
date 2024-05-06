import React, { createContext, useState, useContext } from "react";

const ReservationContext = createContext();

export const useReservation = () => {
  return useContext(ReservationContext);
};

export const ReservationProvider = ({ children }) => {
  const [reservation, setReservation] = useState(null);

  const setReservationData = (data) => {
    setReservation(data);
  };

  return (
    <ReservationContext.Provider value={{ reservation, setReservationData }}>
      {children}
    </ReservationContext.Provider>
  );
};

export default ReservationContext;
