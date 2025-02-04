import React from 'react';
import DynamicForm from '../../components/Forms/DynamicForm';
import RegistrationForm, { UncontrolledForm, RegistrationWithValidation } from '../../components/RegistrationForm';
import Hr from '../../components/Hr';

export default function FormExamplesPage() {
  const formSchema = [
    {
      label: "Jūsų vardas",
      name: "vardas",
      id: "vardas-777",
      className: "text-blue-700",
      type: "text"
    },
    {
      label: "El. paštas",
      name: "email",
      type: "email",
      placeholder: "įrašykite el. pašto adresą",
    }
  ];

  function submitHandler(formData) {
    console.log("Forma pateikta, gauti duomenys:", formData);
  }

  return (
    <>
      <Hr text="Formos pavyzdžiai" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className='card'>
          <h2>Dinamiškai generuojama forma</h2>
          <DynamicForm
            formElements={formSchema}
            onSubmit={submitHandler}
          />
        </div>
        <div className='card'>
          <h2>Kontroliuojama forma `useState()`</h2>
          <RegistrationForm />
        </div>
        <div className='card'>
          <h2>Nekontroliuojama forma `useRef()`</h2>
          <UncontrolledForm />
        </div>
        <div className='card'>
          <h2>Formos validacija</h2>
          <RegistrationWithValidation />
        </div>
      </div>
    </>
  );
}