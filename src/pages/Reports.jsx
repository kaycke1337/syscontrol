import { useState, useEffect } from 'react';
import { getSales } from '../services/storage';
import { Calendar, Printer } from 'lucide-react';
import styles from './Reports.module.css';

const Reports = () => {
    const [sales, setSales] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [filteredSales, setFilteredSales] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        const allSales = getSales();
        setSales(allSales);
    }, []);

    useEffect(() => {
        filterSales();
    }, [sales, selectedMonth, selectedYear]);

    const filterSales = () => {
        const filtered = sales.filter(sale => {
            const saleDate = new Date(sale.date);
            // saleDate.getMonth() returns 0-11, match with selectedMonth
            // Check timezone issues: sale.date is YYYY-MM-DD string likely.
            // new Date('2023-02-13') is UTC usually, but browser local. 
            // Let's safe parse.
            const [year, month, day] = sale.date.split('-').map(Number);
            return year === selectedYear && (month - 1) === selectedMonth;
        });

        setFilteredSales(filtered);
        const total = filtered.reduce((acc, sale) => acc + sale.amount, 0);
        setTotalRevenue(total);
    };

    const handlePrint = () => {
        window.print();
    };

    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Relatório Mensal</h1>
                <button onClick={handlePrint} className={styles.printButton}>
                    <Printer size={20} />
                    Imprimir
                </button>
            </header>

            <div className={styles.controls}>
                <div className={styles.filterGroup}>
                    <label><Calendar size={16} /> Mês</label>
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    >
                        {months.map((month, index) => (
                            <option key={index} value={index}>{month}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <label>Ano</label>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                    >
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={styles.summary}>
                <div className={styles.summaryCard}>
                    <h3>Total de Vendas</h3>
                    <p>{filteredSales.length}</p>
                </div>
                <div className={styles.summaryCard}>
                    <h3>Receita do Período</h3>
                    <p className={styles.highlight}>R$ {totalRevenue.toFixed(2)}</p>
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
                                    Nenhuma venda neste período.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Reports;
