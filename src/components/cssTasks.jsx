import React, { useState, useEffect} from 'react';
import styles from './cssTasks.module.css'; // Import CSS modules

// Task 1: Login Form
function LoginForm() {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="El. paštas"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={styles.input}
                />
                <input
                    type="password"
                    placeholder="Slaptažodis"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>Siūsti</button>
            </form>
        </div>
    );
}

// Task 2: Dynamic Text Fields
function DynamicFields() {
    const [fields, setFields] = useState(['']);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Fields:', fields);
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                {fields.map((field, index) => (
                    <input
                        key={index}
                        type="text"
                        value={field}
                        onChange={(e) => {
                            const newFields = [...fields];
                            newFields[index] = e.target.value;
                            setFields(newFields);
                        }}
                        className={index % 2 === 0 ? styles.even : styles.odd}
                    />
                ))}
                <button
                    type="button"
                    onClick={() => setFields([...fields, ''])}
                    className={styles.button}>
                    + Pridėti laukelį
                </button>
                <button type="submit" className={styles.button}>Siūsti</button>
            </form>
        </div>
    );
}

// Task 3: Form Validation
function ValidationForm() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Vardas Privalomas';
        if (!formData.email.includes('@')) newErrors.email = 'Netinkamas el.pašto formatas';
        if (formData.password.length < 6) newErrors.password = 'Slaptažodis turi būti bent 6 simbolių';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            console.log('Form Data:', formData);
            setErrors({});
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Vardas"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={styles.input}
                />
                {errors.name && <p className={styles.error}>{errors.name}</p>}
                <input
                    type="email"
                    placeholder="El. paštas"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={styles.input}
                />
                {errors.email && <p className={styles.error}>{errors.email}</p>}
                <input
                    type="password"
                    placeholder="Slaptažodis"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={styles.input}
                />
                {errors.password && <p className={styles.error}>{errors.password}</p>}
                <button type="submit" className={styles.button}>Registruoti</button>
            </form>
        </div>
    );
}

// Task 4: Responsive Theme
function MouseMoveBackground() {
    const [bgColor, setBgColor] = useState('rgb(255, 255, 255)');

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const r = Math.round((clientX / window.innerWidth) * 255);
            const g = Math.round((clientY / window.innerHeight) * 255);
            const b = 150;
            setBgColor(`rgb(${r}, ${g}, ${b})`);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="h-full flex items-center justify-center" style={{ backgroundColor: bgColor }}>
            <p>Judink pale kad keistum spalvas!</p>
        </div>
    );
}

export {MouseMoveBackground, LoginForm, DynamicFields, ValidationForm};