import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Login form component with validation and error handling
 */
const LoginForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Basic email validation
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Password validation
  const validatePassword = (password) => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Real-time validation
    if (name === 'email' && value) {
      setErrors(prev => ({
        ...prev,
        email: validateEmail(value) ? '' : 'Neteisingas el. pašto formatas'
      }));
    }
    
    if (name === 'password' && value) {
      setErrors(prev => ({
        ...prev,
        password: validatePassword(value) ? '' : 'Slaptažodis turi būti bent 8 simbolių ilgio, turėti didžiąją ir mažąją raides, skaičių ir specialų simbolį'
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const newErrors = {
      email: !formData.email ? 'El. paštas privalomas' : 
             !validateEmail(formData.email) ? 'Neteisingas el. pašto formatas' : '',
      password: !formData.password ? 'Slaptažodis privalomas' : 
                !validatePassword(formData.password) ? 'Netinkamas slaptažodžio formatas' : ''
    };

    setErrors(newErrors);

    // If no errors, submit the form
    if (!newErrors.email && !newErrors.password) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Email Input */}
      <div>
        <label 
          htmlFor="email" 
          className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
        >
          El. paštas
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`
            w-full px-4 py-2
            border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
            rounded-lg
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-white
            focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark
            focus:border-transparent
          `}
          placeholder="vardas@pavyzdys.lt"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Password Input */}
      <div>
        <label 
          htmlFor="password" 
          className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
        >
          Slaptažodis
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`
              w-full px-4 py-2
              border ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
              rounded-lg
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-white
              focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark
              focus:border-transparent
              pr-10
            `}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? "Slėpti" : "Rodyti"}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password}</p>
        )}
      </div>

      {/* Remember Me Checkbox */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="rememberMe"
          name="rememberMe"
          checked={formData.rememberMe}
          onChange={handleChange}
          className="h-4 w-4 text-primary-light focus:ring-primary-light border-gray-300 rounded"
        />
        <label 
          htmlFor="rememberMe" 
          className="ml-2 block text-sm text-gray-700 dark:text-gray-200"
        >
          Prisiminti mane
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="
          w-full px-4 py-2
          bg-primary-light hover:bg-primary-DEFAULT dark:bg-primary-dark
          text-white
          rounded-lg
          transition-colors
          focus:ring-2 focus:ring-offset-2 focus:ring-primary-light
        "
      >
        Prisijungti
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default LoginForm;
