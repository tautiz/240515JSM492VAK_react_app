import React, { useState, useRef } from 'react';
import Form from './Forms/Form';
import Input from './Forms/Input';

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
        <Form onSubmit={handleSubmit}>
            <div>
                <Input
                    type="text"
                    name="name"
                    label="Vardas"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <Input
                    type="email"
                    name="email"
                    label="El. Pastas"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <Input
                    type="password"
                    name="password"
                    label="Slaptazodis"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Register</button>
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

    // Funkcija skirta validuoti visa forma ir grazinti klaidu objekta
    const validate = () => {
        const newErrors = {};

        if (!formData.name) newErrors.name = 'Privalomas vardo laukelis';
        if (!formData.email.includes('@')) newErrors.email = 'Netaisyklingas el. pasto adresas.';
        if (formData.password.length < 6) newErrors.password = 'Slaptazodis turi buti bent 6 simboliu.';

        return newErrors;
    };

    // Funkcija skirta formos duomenims apdoroti
    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = validate(); // Kvieciama validavimo funkcija ir jos rezultatas saugomas newErrors konstantoje

        if (Object.keys(newErrors).length > 0) { // Jei newErrors objektas turi bent viena klaida
            setErrors(newErrors);
        } else {
            // Tvarkingu duomenu atveju, isvedam juos i narsykles konsole
            console.log('Submitted Data:', formData);
            setErrors({});
        }
    };

    // Handleris skirtas stebeti elementu duomenu pasikeitimams
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
            </div>
            <button type="submit">Register</button>
        </Form>
    );
}

export { RegistrationWithValidation};
