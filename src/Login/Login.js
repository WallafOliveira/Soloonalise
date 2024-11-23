import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Dados do formulário
        const usuario = {
            email: email,
            senha: senha
        };

        // Enviar dados para o backend Flask
        axios.post('http://127.0.0.1:5000/login', usuario)
            .then(response => {
                setSucesso('Login bem-sucedido!');
                setErro('');
                setEmail('');
                setSenha('');
            })
            .catch(error => {
                setErro('Erro ao fazer login.');
                setSucesso('');
            });
    };

    return (
        <div>
            <h1>Login</h1>
            
            {sucesso && <p style={{ color: 'green' }}>{sucesso}</p>}
            {erro && <p style={{ color: 'red' }}>{erro}</p>}
            
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </label>
                <br />
                <label>
                    Senha:
                    <input 
                        type="password" 
                        value={senha} 
                        onChange={(e) => setSenha(e.target.value)} 
                        required 
                    />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
