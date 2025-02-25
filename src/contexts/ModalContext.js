import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modalState, setModalState] = useState({
    isOpen: false,
    component: null
  });

  const openModal = (component) => {
    setModalState({
      isOpen: true,
      component
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      component: null
    });
  };

  return (
    <ModalContext.Provider value={{ ...modalState, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
