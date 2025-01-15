import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';
import Form from './Form';

export default function DynamicForm({ formElements = [], onSubmit }) {
    // Paruošiame pradinį state remdamiesi formElements masyvu
    // Kiekvienam laukui iš anksto suteikiame tuščią reikšmę (arba galite naudoti defaultValue, jei reikia)
    const initialFormState = formElements.reduce((acc, element) => {
        // element.name – raktas, pagal kurį atpažinsime laukelį
        acc[element.name] = element.value || '';
        return acc;
    }, {});

    const [formData, setFormData] = useState(initialFormState);

    // Universalus onChange handler'is, atnaujinantis bendrą formos state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Kai forma pateikiama (submit), iškviečiame iš išorės gautą onSubmit ir perduodame surinktą formData
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Form onSubmit={handleSubmit}>
            {formElements.map((element, index) => {
                // Iš formElements objekto išsiimame kai kurias reikšmes,
                // o visas kitas (likusias) – priskiriame inputui kaip atributus
                const { label, name, onChange, ...otherProps } = element;

                return (
                    <div key={index}>
                        {/* Jei nurodytas label, išvedame jį */}
                        {label && (
                            <label htmlFor={otherProps.id || name} className="block text-gray-700 text-sm font-bold mb-2">
                                {label}
                            </label>
                        )}

                        {/* Kontroliuojamas <input>, kuris turi value iš lokalaus state */}
                        <Input
                            name={name}
                            value={formData[name]}
                            onChange={onChange || handleChange}
                            {...otherProps}
                        // ...otherProps leis priskirti visus likusius atributus, pvz. className, data-* ir pan.
                        />
                    </div>
                );
            })}

            <Button type="submit">Register</Button>
        </Form>
    );
}
