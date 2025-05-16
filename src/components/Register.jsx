import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

export const Register = () => {
    const [formData, setFormData] = useState({
        dni: '',
        name: '',
        apellido: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        try {
            const endpoint = "/auth/register";
            const response = await axios.post(API_URL + endpoint, {
                dni: formData.dni,
                name: formData.name,
                apellido: formData.apellido,
                username: formData.username,
                password: formData.password
            });
            const {token} = response.data;

            //guardar el token en localstorage para usar el futuras peticiones
            localStorage.setItem('token', token);
            console.log("token:", token);
            alert("Registro exitoso. Inicia sesión.");

            navigate("/login");
        } catch (err) {
            setError("Error al registrar. Revisa los datos." + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="App">
            <div className="auth-form-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <h2>Registro</h2>

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <label htmlFor="dni">DNI</label>
                    <input
                        name="dni"
                        value={formData.dni}
                        onChange={handleChange}
                        placeholder="1234567896"
                        required
                    />

                    <label htmlFor="name">Nombre</label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nombre"
                        required
                    />

                    <label htmlFor="apellido">Apellido</label>
                    <input
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        placeholder="Apellido"
                        required
                    />

                    <label htmlFor="username">Email</label>
                    <input
                        name="username"
                        type="email"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="tuuser@gmail.com"
                        required
                    />

                    <label htmlFor="password">Contraseña</label>
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="********"
                        required
                    />

                    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="********"
                        required
                    />

                    <button type="submit">Registrar</button>
                </form>

                <button className="link-btn" onClick={() => navigate("/login")}>
                    ¿Ya tienes una cuenta? Inicia sesión aquí.
                </button>
            </div>
        </div>
    );
};
