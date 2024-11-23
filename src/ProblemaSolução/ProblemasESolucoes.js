import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const ProblemasESolucoes = () => {
    const [condicoesAnormais, setCondicoesAnormais] = useState([]);

    useEffect(() => {
        // Requisição para obter as condições anormais e soluções do backend
        axios.get('http://127.0.0.1:5000/api/condicoes_anormais')
            .then(response => {
                // Inverter a ordem dos itens para que o último fique no topo
                setCondicoesAnormais(response.data.reverse());
            })
            .catch(error => {
                console.error('Erro ao buscar as condições anormais', error);
            });
    }, []);

    return (
        <div className="container">
            <h1>Problemas e Soluções do Solo</h1>
            
            {condicoesAnormais.length > 0 ? (
                condicoesAnormais.map((item) => (
                    <div className="card" key={item.id}>
                        <h2>Condicoes Anormais para o Solo {item.id}</h2>
                        
                        <table>
                            <thead>
                                <tr>
                                    <th>Parâmetro</th>
                                    <th>Condição</th>
                                    <th>Solução</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(item.condicoes).map((parametro) => (
                                    <tr key={parametro}>
                                        <td>{parametro}</td>
                                        <td className="problema">{item.condicoes[parametro]}</td>
                                        <td className="solucao">{item.tratamentos[parametro]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))
            ) : (
                <p className="mensagem erro">Nenhuma condição anormal encontrada.</p>
            )}
        </div>
    );
};

export default ProblemasESolucoes;
