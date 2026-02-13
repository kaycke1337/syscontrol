import { saveCustomer, saveSale, getCustomers } from './storage';

export const seedData = () => {
    if (getCustomers().length > 0) return; // Already has data

    const customers = [
        { id: 1, name: 'Empresa ABC', email: 'contato@abc.com', phone: '11999999999', address: 'Rua A, 123' },
        { id: 2, name: 'João Silva', email: 'joao@email.com', phone: '11988888888', address: 'Av B, 456' },
        { id: 3, name: 'Maria Oliveira', email: 'maria@email.com', phone: '11977777777', address: 'Praça C, 789' },
    ];

    customers.forEach(c => saveCustomer(c));

    const today = new Date();
    const sales = [
        { id: 101, customerId: 1, customerName: 'Empresa ABC', amount: 1500.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5).toISOString().split('T')[0], description: 'Consultoria' },
        { id: 102, customerId: 2, customerName: 'João Silva', amount: 350.50, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3).toISOString().split('T')[0], description: 'Produtos Variados' },
        { id: 103, customerId: 1, customerName: 'Empresa ABC', amount: 2000.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2).toISOString().split('T')[0], description: 'Licença de Software' },
        { id: 104, customerId: 3, customerName: 'Maria Oliveira', amount: 120.00, date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).toISOString().split('T')[0], description: 'Suporte Técnico' },
        { id: 105, customerId: 2, customerName: 'João Silva', amount: 500.00, date: today.toISOString().split('T')[0], description: 'Manutenção' },
    ];

    sales.forEach(s => saveSale(s));

    console.log('Demo data seeded!');
    window.location.reload();
};
