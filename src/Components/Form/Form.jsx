import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './Form.module.css';
import { cpfMask, cnpjMask } from '../Masks/Masks.jsx';

export function Formulario() {
    const { handleSubmit } = useForm();
    const [tipoDocumento, setTipoDoDocumento] = useState('cpf');
    const [cpf, setCpf] = useState('');
    const [cnpj,setCnpj] = useState('');

    const handleTabChange = (tipo) => {
        setTipoDoDocumento(tipo);
        setCpf('');
        setCnpj('');
    };

    async function Enviar() {
        const valor = tipoDocumento === 'cpf' ? cpf : cnpj;
        const documentoValido = valor.replace(/\D/g, '')

        if (tipoDocumento === 'cpf' && cpf.length < 14) {
            alert('CPF Incompleto')
            return;
        }

        if (tipoDocumento === 'cnpj' && cnpj.length < 18) {
            alert('CNPJ Incompleto')
            return;
        }

        const payload = {
            tipo: tipoDocumento,
            documento: documentoValido
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
            <div className={styles.tabContainer}>
                <button
                    type="button"
                    className={`${styles.tabButton} ${tipoDocumento === 'cpf' ? styles.activeTab : ''}`}
                    onClick={() => handleTabChange('cpf')}
                >
                    CPF
                </button>
                <button
                    type="button"
                    className={`${styles.tabButton} ${tipoDocumento === 'cnpj' ? styles.activeTab : ''}`}
                    onClick={() => handleTabChange('cnpj')}
                >
                    CNPJ
                </button>
            </div>

            {tipoDocumento === 'cpf' && (
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
            )}

            {tipoDocumento === 'cnpj' && (
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
            )}

            <button type="submit" className={styles.button}>
                Enviar
            </button>
        </form>
    );
}