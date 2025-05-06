import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
export const Register = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/auth/register", {
                name,
                email,
                password: pass,
            });

            alert("Registro exitoso. Inicia sesión.");
            navigate("/login");
        } catch (err) {
            alert("Error al registrar");
        }
    };

    return (
        <div className="App">
            <div className="auth-form-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <h2>Register</h2>

                    <label htmlFor="name">Full name</label>
                    <input
                        value={name}
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        id="name"
                        placeholder="Nombre completo"
                        required
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="tuemail@gmail.com"
                        id="email"
                        name="email"
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        type="password"
                        placeholder="********"
                        id="password"
                        name="password"
                        required
                    />

                    <button type="submit">Register</button>
                </form>
                <button className="link-btn" onClick={() => navigate("/login")}>
                ¿Ya tienes una cuenta? Inicia sesión aquí.
                </button>
            </div>
        </div>
    )
}
