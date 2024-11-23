import React, { useState } from 'react';

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

        // Enviar dados para o backend Flask utilizando fetch
        fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao fazer login.');
                }
                return response.json(); // Supondo que o backend retorna um JSON
            })
            .then(data => {
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
