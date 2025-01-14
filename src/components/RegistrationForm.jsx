import React, { useState, useRef } from 'react';
import Form from './Forms/Form';
import Input from './Forms/Input';
import Button from './Forms/Button';

// ++++++++++++++++++ KONTROLIUOJAMA FORMA +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function RegistrationForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted Data:', formData);
    };

    return (
        <Form onSubmit={handleSubmit} id="ManoForma">
            <Input
                name="name"
                label={'Vardas'}
                value={formData.name}
                onChange={handleChange}
            />
            <Input
                type="text"
                name="email"
                label={'El. Pastas'}
                value={formData.email}
                onChange={handleChange}
            />
            <Input
                type="password"
                name="password"
                label={'Slaptazodis'}
                value={formData.password}
                onChange={handleChange}
            />
            <Button type="submit">Register</Button>
        </Form>
    );
}

export default RegistrationForm;

// ++++++++++++++++++ NEKONTROLIUOJAMA FORMA ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function UncontrolledForm() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Name:', nameRef.current.value);
        console.log('Email:', emailRef.current.value);
        console.log('Password:', passwordRef.current.value);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" ref={nameRef} />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" ref={emailRef}/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" ref={passwordRef}/>
            </div>
            <button type="submit">Register</button>
        </Form>
    );
}

export { UncontrolledForm };

// ++++++++++++++++++ FORMOS VALIDAVIMAS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function RegistrationWithValidation() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    // Funkcija skirta validuoti visa forma ir grazinti klaidu objekta
    const validateALLFields = () => {
        const newErrors = {};

        Object.keys(formData).map((formElement) => { 
            
            if (formElement === 'email' && !formData[formElement].includes('@')) {
                newErrors[formElement] = 'Netaisyklingas el. pasto adresas.';
            }
            
            if (formElement === 'password' && formData[formElement].length < 6) {
                newErrors[formElement] = 'Slaptazodis turi buti bent 6 simboliu.';
            }
            
            if (!formData[formElement]) {
                newErrors[formElement] = `Privalomas ${formElement} laukelis`;
            }
        });

        return newErrors;
    };

    // Funkcija skirta formos duomenims apdoroti
    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = validateALLFields(); // Kvieciama validavimo funkcija ir jos rezultatas saugomas newErrors konstantoje

        if (Object.keys(newErrors).length > 0) { // Jei newErrors objektas turi bent viena klaida
            setErrors(newErrors);
        } else {
            // Tvarkingu duomenu atveju, isvedam juos i narsykles konsole
            console.log('Submitted Data:', formData);
            setSuccessMessage('Registracija sekminga!\n' + JSON.stringify(formData));
            setErrors({});
        }
    };

    // Handleris skirtas stebeti elementu duomenu pasikeitimams
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({...errors, [e.target.name]: ''});
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                type="text"
                name="name"
                label={'Vardas'}
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
            />
            <Input
                type="text"
                name="email"
                label={'El. Pastas'}
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
            />
            <Input
                type="password"
                name="password"
                label={'Slaptazodis'}
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
            />
            <Button type="submit">Register</Button>
            {successMessage && <p>{successMessage}</p>}
        </Form>
    );
}

export { RegistrationWithValidation};
