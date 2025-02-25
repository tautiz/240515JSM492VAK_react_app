import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * A reusable modal component with backdrop and animations
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {function} props.onClose - Function to call when modal should close
 * @param {React.ReactNode} props.children - Modal content
 * @param {string} [props.title] - Optional modal title
 */
const Modal = ({ isOpen, onClose, children, title }) => {
  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto overflow-x-hidden animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      {/* Backdrop with darker background */}
      <div 
        className="fixed inset-0 bg-gray-900/75 dark:bg-gray-900/90 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content - improved centering and z-index */}
      <div className="
        relative 
        w-full max-w-md
        mx-auto my-8
        bg-background-light dark:bg-background-dark 
        rounded-lg shadow-xl 
        p-6 
        animate-slide-in
        z-[101]
      ">
        {title && (
          <h2 
            id="modal-title"
            className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
          >
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

export default Modal;
