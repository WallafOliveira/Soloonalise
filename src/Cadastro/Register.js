import React, { useState } from 'react';

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

        // Enviar dados para o backend Flask utilizando fetch
        fetch('http://127.0.0.1:5000/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao cadastrar usuário.');
                }
                return response.json(); // Supondo que o backend retorna um JSON
            })
            .then(data => {
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
