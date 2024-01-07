import React, { createContext, useContext, useEffect, useState } from 'react'

const crypto = createContext();

const CryptoContext = ({children}) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setsymbol] = useState("₹");

  useEffect(() =>{
    if (currency ==="INR") {
      setsymbol("₹");
    }else if (currency === "USD") {
      setsymbol("$");
    }
  },[currency]);

  return (
    <crypto.Provider value={{currency, setCurrency,  symbol}}>{children}</crypto.Provider>

  )
};

export default CryptoContext;

export const CryptoState = () =>{
    return useContext(crypto);
};
