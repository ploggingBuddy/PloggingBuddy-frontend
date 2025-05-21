import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const AddressPopupContext = createContext();

export function AddressPopupProvider({ children }) {
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const { isLoggedIn, setShowLoginModal } = useAuth();

  const openAddressPopup = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setShowAddressPopup(true);
  };

  const closeAddressPopup = () => {
    setShowAddressPopup(false);
  };

  return (
    <AddressPopupContext.Provider
      value={{ showAddressPopup, openAddressPopup, closeAddressPopup }}
    >
      {children}
    </AddressPopupContext.Provider>
  );
}

export function useAddressPopup() {
  const context = useContext(AddressPopupContext);
  if (!context) {
    throw new Error(
      "useAddressPopup must be used within an AddressPopupProvider"
    );
  }
  return context;
}
