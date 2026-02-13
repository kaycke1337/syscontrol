import { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getCustomers, getSales } from '../services/storage';
import { seedData } from '../services/seed';
import { Users, ShoppingCart, DollarSign, TrendingUp, Database } from 'lucide-react';
import styles from './Dashboard.module.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [metrics, setMetrics] = useState({
        totalCustomers: 0,
        totalSales: 0,
        totalRevenue: 0,
        averageTicket: 0
    });
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        const customers = getCustomers();
        const sales = getSales();

        // Metrics
        const totalRevenue = sales.reduce((acc, sale) => acc + sale.amount, 0);
        const averageTicket = sales.length > 0 ? totalRevenue / sales.length : 0;

        setMetrics({
            totalCustomers: customers.length,
            totalSales: sales.length,
            totalRevenue,
            averageTicket
        });

        // Chart Data (Last 7 days or grouped by day)
        const salesByDate = {};
        sales.forEach(sale => {
            const date = new Date(sale.date).toLocaleDateString();
            salesByDate[date] = (salesByDate[date] || 0) + sale.amount;
        });

        // Sort dates
        const sortedDates = Object.keys(salesByDate).sort((a, b) => {
            const dateA = new Date(a.split('/').reverse().join('-'));
            const dateB = new Date(b.split('/').reverse().join('-'));
            return dateA - dateB;
        });

        // Take last 7 days appropriate for chart if too many
        const labels = sortedDates.slice(-7);
        const data = labels.map(date => salesByDate[date]);

        setChartData({
            labels,
            datasets: [
                {
                    label: 'Vendas (R$)',
                    data: data,
                    borderColor: 'rgb(79, 70, 229)',
                    backgroundColor: 'rgba(79, 70, 229, 0.5)',
                    tension: 0.3
                }
            ]
        });

    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Vendas nos últimos dias',
            },
        },
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Dashboard</h1>
                {metrics.totalCustomers === 0 && (
                    <button onClick={seedData} className={styles.seedButton}>
                        <Database size={16} />
                        Gerar Dados de Teste
                    </button>
                )}
            </div>

            <div className={styles.grid}>
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <span>Total Clientes</span>
                        <Users className={styles.icon} />
                    </div>
                    <div className={styles.cardValue}>{metrics.totalCustomers}</div>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <span>Vendas Realizadas</span>
                        <ShoppingCart className={styles.icon} />
                    </div>
                    <div className={styles.cardValue}>{metrics.totalSales}</div>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <span>Receita Total</span>
                        <DollarSign className={styles.icon} />
                    </div>
                    <div className={styles.cardValue}>
                        R$ {metrics.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <span>Ticket Médio</span>
                        <TrendingUp className={styles.icon} />
                    </div>
                    <div className={styles.cardValue}>
                        R$ {metrics.averageTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                </div>
            </div>

            <div className={styles.chartContainer}>
                {chartData.labels.length > 0 ? (
                    <Line options={options} data={chartData} />
                ) : (
                    <p className={styles.noData}>Ainda não há dados suficientes para o gráfico.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
