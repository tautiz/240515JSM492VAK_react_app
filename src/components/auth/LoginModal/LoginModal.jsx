import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../common/Modal/Modal';
import LoginForm from '../LoginForm/LoginForm';

/**
 * Login modal component that combines Modal and LoginForm
 */
const LoginModal = ({ isOpen, onClose, onSubmit }) => {
  const handleSubmit = async (formData) => {
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Prisijungimas"
    >
      <div className="space-y-6">
        <LoginForm onSubmit={handleSubmit} />
        
        {/* Additional Links */}
        <div className="mt-4 flex justify-between text-sm">
          <a 
            href="#" 
            className="
              text-primary-light hover:text-primary-DEFAULT 
              dark:text-primary-dark dark:hover:text-primary-light
              transition-colors
            "
            onClick={(e) => {
              e.preventDefault();
              // Handle forgot password
            }}
          >
            Pamiršote slaptažodį?
          </a>
          <a 
            href="#" 
            className="
              text-primary-light hover:text-primary-DEFAULT 
              dark:text-primary-dark dark:hover:text-primary-light
              transition-colors
            "
            onClick={(e) => {
              e.preventDefault();
              // Handle registration
            }}
          >
            Registracija
          </a>
        </div>
      </div>
    </Modal>
  );
};

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default LoginModal;
