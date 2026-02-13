import { useState, useEffect } from 'react';
import { getCustomers } from '../../services/storage';
import styles from './SaleForm.module.css';

const SaleForm = ({ onSubmit, onCancel }) => {
    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState({
        customerId: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        description: ''
    });

    useEffect(() => {
        setCustomers(getCustomers());
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const customer = customers.find(c => c.id === Number(formData.customerId));
        onSubmit({
            ...formData,
            id: Date.now(),
            amount: Number(formData.amount),
            customerName: customer ? customer.name : 'Unknown'
        });
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <label htmlFor="customerId">Cliente</label>
                <select
                    id="customerId"
                    name="customerId"
                    value={formData.customerId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione um cliente...</option>
                    {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>
                            {customer.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="amount">Valor (R$)</label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    step="0.01"
                    min="0"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="date">Data</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="description">Descrição / Itens</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Detalhes da venda..."
                    required
                />
            </div>

            <div className={styles.actions}>
                <button type="button" onClick={onCancel} className={styles.cancelButton}>
                    Cancelar
                </button>
                <button type="submit" className={styles.submitButton}>
                    Registrar Venda
                </button>
            </div>
        </form>
    );
};

export default SaleForm;
