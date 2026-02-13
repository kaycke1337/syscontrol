const STORAGE_KEYS = {
    CUSTOMERS: 'syscontrol_customers',
    SALES: 'syscontrol_sales',
};

export const getCustomers = () => {
    const data = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    return data ? JSON.parse(data) : [];
};

export const saveCustomer = (customer) => {
    const customers = getCustomers();
    const index = customers.findIndex(c => c.id === customer.id);

    if (index >= 0) {
        customers[index] = customer;
    } else {
        customers.push(customer);
    }

    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
    return customer;
};

export const deleteCustomer = (id) => {
    const customers = getCustomers();
    const filtered = customers.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(filtered));
};

export const getSales = () => {
    const data = localStorage.getItem(STORAGE_KEYS.SALES);
    return data ? JSON.parse(data) : [];
};

export const saveSale = (sale) => {
    const sales = getSales();
    sales.push(sale);
    localStorage.setItem(STORAGE_KEYS.SALES, JSON.stringify(sales));
    return sale;
};
