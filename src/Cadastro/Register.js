import React, { useState } from 'react';
import axios from 'axios';

const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Dados do formulário
        const usuario = {
            nome: nome,
            email: email,
            senha: senha  // Senha em texto simples, que será enviada para o backend
        };

        // Enviar dados para o backend Flask
        axios.post('http://127.0.0.1:5000/usuarios', usuario)
            .then(response => {
                setSucesso('Usuário cadastrado com sucesso!');
                setErro('');
                setNome('');
                setEmail('');
                setSenha('');
            })
            .catch(error => {
                setErro('Erro ao cadastrar usuário.');
                setSucesso('');
            });
    };

    return (
        <div>
            <h1>Cadastro de Usuário</h1>
            
            {sucesso && <p style={{ color: 'green' }}>{sucesso}</p>}
            {erro && <p style={{ color: 'red' }}>{erro}</p>}
            
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input 
                        type="text" 
                        value={nome} 
                        onChange={(e) => setNome(e.target.value)} 
                        required 
                    />
                </label>
                <br />
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
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
};

export default Cadastro;
