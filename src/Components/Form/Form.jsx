import React from 'react';
import {useForm} from 'react-hook-form';
import styles from './Form.module.css';

export function Formulario() {
    const { register, handleSubmit, reset } = useForm();

    function Enviar(dados) {
        console.log('Insira os dados do formulário:', dados);
        alert('Formulário enviado com sucesso!');
        reset();
    }
    
    return (
        <form onSubmit={handleSubmit(Enviar)} className={styles.container}>
            <div className={styles.formGroup}>
                <label className={styles.label}>CPF/CNPJ:</label>
                <input maxLength={18} {...register('cpfCnpj', { required: true })} className={styles.input} />
            </div>

            <button type="submit" className={styles.button}>
                Enviar
            </button>
        </form>
    );
}
