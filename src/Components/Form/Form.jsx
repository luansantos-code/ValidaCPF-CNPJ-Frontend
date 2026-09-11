import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './Form.module.css';
import { cpfMask, cnpjMask } from '../Masks/Masks.jsx';

export function Formulario() {
    const { handleSubmit } = useForm();
    const [cpf, setCpf] = useState('');
    const [cnpj,setCnpj] = useState('');

    async function Enviar() {
        if ((cpf.length > 0 && cpf.length < 14) || (cnpj.length > 0 && cnpj.length < 18)) {
            alert('Por favor, insira um CPF ou CNPJ válido antes de enviar.');
            return;
        }

        const payload = {
            cpf: cpf,
            cnpj: cnpj
        };
        
        console.log('Enviando dados para API:', payload);

        try {
            const response = await fetch('http://localhost:8080/validar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            
            if (response.ok) {
                const resultado = await response.json();
                console.log('Resposta da API:', resultado);
            }
            else {
                console.error('Erro na resposta da API');
            }
        } catch (error) {
            console.error('Erro ao enviar dados para a API:', error);
            alert('Ocorreu um erro ao enviar os dados. Por favor, tente novamente mais tarde.');
        }
    }
    
    return (
        <form onSubmit={handleSubmit(Enviar)} className={styles.container}>
            <div className={styles.formGroup}>
                <label className={styles.label}>CPF:</label>
                <input 
                    maxLength={14} 
                    value={cpf} 
                    onChange={(e) => setCpf(cpfMask(e.target.value))} 
                    className={styles.input}
                    placeholder="000.000.000-00"
                />
                {cpf.length > 0 && cpf.length < 14 && (
                    <p className={styles.error}>CPF incompleto</p>
                )}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>CNPJ:</label>
                <input 
                    maxLength={18} 
                    value={cnpj} 
                    onChange={(e) => setCnpj(cnpjMask(e.target.value))} 
                    className={styles.input}
                    placeholder="00.000.000/0000-00"
                />
                {cnpj.length > 0 && cnpj.length < 18 && (
                    <p className={styles.error}>CNPJ incompleto</p>
                )}
            </div>

            <button type="submit" className={styles.button}>
                Enviar
            </button>
        </form>
    );
}
