import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { getCustomers, saveCustomer, deleteCustomer } from '../services/storage';
import Modal from '../components/Layout/Modal';
import CustomerForm from '../components/Forms/CustomerForm';
import styles from './Customers.module.css';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCustomer, setCurrentCustomer] = useState(null);

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = () => {
        setCustomers(getCustomers());
    };

    const handleAdd = () => {
        setCurrentCustomer(null);
        setIsModalOpen(true);
    };

    const handleEdit = (customer) => {
        setCurrentCustomer(customer);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
            deleteCustomer(id);
            loadCustomers();
        }
    };

    const handleSubmit = (data) => {
        saveCustomer(data);
        setIsModalOpen(false);
        loadCustomers();
    };

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Clientes</h1>
                <button onClick={handleAdd} className={styles.addButton}>
                    <Plus size={20} />
                    Novo Cliente
                </button>
            </header>

            <div className={styles.controls}>
                <div className={styles.search}>
                    <Search size={20} className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Buscar por nome ou email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.length > 0 ? (
                            filteredCustomers.map((customer) => (
                                <tr key={customer.id}>
                                    <td>{customer.name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.phone}</td>
                                    <td className={styles.actions}>
                                        <button onClick={() => handleEdit(customer)} className={styles.actionButton}>
                                            <Edit size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(customer.id)} className={`${styles.actionButton} ${styles.delete}`}>
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className={styles.empty}>
                                    Nenhum cliente encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={currentCustomer ? 'Editar Cliente' : 'Novo Cliente'}
            >
                <CustomerForm
                    customer={currentCustomer}
                    onSubmit={handleSubmit}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
};

export default Customers;
