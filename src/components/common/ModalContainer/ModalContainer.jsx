import React from 'react';
import { useModal } from '../../../contexts/ModalContext';
import Modal from '../Modal/Modal';

/**
 * ModalContainer component that manages the display of modals using ModalContext
 * This component should be mounted at the root level of the application
 */
const ModalContainer = () => {
  const { isOpen, component: ModalComponent, closeModal } = useModal();
  
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      {ModalComponent}
    </Modal>
  );
};

export default ModalContainer;
