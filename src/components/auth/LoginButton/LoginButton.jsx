import React from 'react';
import { useModal } from '../../../contexts/ModalContext';
import LoginForm from '../LoginForm/LoginForm';
import authService from '../../../services/authService';

/**
 * Login button component that opens login modal using ModalContext
 */
const LoginButton = () => {
  const { openModal } = useModal();

  const handleLogin = async (credentials) => {
    try {
      await authService.login(credentials);
      // Handle successful login
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleOpenModal = () => {
    openModal(
      <div className="space-y-6">
        <LoginForm onSubmit={handleLogin} />
        
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
    );
  };

  return (
    <button
      onClick={handleOpenModal}
      className="
        px-4 py-2
        bg-primary-light hover:bg-primary-DEFAULT dark:bg-primary-dark
        text-white
        rounded-lg
        transition-colors
        focus:ring-2 focus:ring-offset-2 focus:ring-primary-light
      "
    >
      Prisijungti
    </button>
  );
};

export default LoginButton;
