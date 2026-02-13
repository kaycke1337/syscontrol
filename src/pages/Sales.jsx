import { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { getSales, saveSale } from '../services/storage';
import Modal from '../components/Layout/Modal';
import SaleForm from '../components/Forms/SaleForm';
import styles from './Sales.module.css';

const Sales = () => {
    const [sales, setSales] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadSales();
    }, []);

    const loadSales = () => {
        const data = getSales();
        // Sort by date desc
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setSales(data);
    };

    const handleAdd = () => {
        setIsModalOpen(true);
    };

    const handleSubmit = (data) => {
        saveSale(data);
        setIsModalOpen(false);
        loadSales();
    };

    const filteredSales = sales.filter(s =>
        s.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalAmount = filteredSales.reduce((sum, sale) => sum + sale.amount, 0);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Vendas</h1>
                <button onClick={handleAdd} className={styles.addButton}>
                    <Plus size={20} />
                    Nova Venda
                </button>
            </header>

            <div className={styles.controls}>
                <div className={styles.search}>
                    <Search size={20} className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Buscar por cliente ou descrição..."
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
                            <th>Data</th>
                            <th>Cliente</th>
                            <th>Descrição</th>
                            <th className={styles.amountColumn}>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSales.length > 0 ? (
                            filteredSales.map((sale) => (
                                <tr key={sale.id}>
                                    <td>{new Date(sale.date).toLocaleDateString()}</td>
                                    <td>{sale.customerName}</td>
                                    <td>{sale.description}</td>
                                    <td className={styles.amountColumn}>
                                        R$ {sale.amount.toFixed(2)}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className={styles.empty}>
                                    Nenhuma venda encontrada.
                                </td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr className={styles.totalRow}>
                            <td colSpan="3">Total</td>
                            <td className={styles.amountColumn}>R$ {totalAmount.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Nova Venda"
            >
                <SaleForm
                    onSubmit={handleSubmit}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
};

export default Sales;
