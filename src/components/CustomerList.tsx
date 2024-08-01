import React, { useState, useMemo } from 'react';
import CustomerCard from './CustomerCard';
import { Customer } from '../types';
import './CustomerList.css';

interface Props {
    customers: Customer[];
    selectedCustomer: Customer | null;
    onSelectCustomer: (customer: Customer) => void;
}

const CustomerList: React.FC<Props> = ({ customers, selectedCustomer, onSelectCustomer }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCustomers = useMemo(() => {
        return customers.filter(customer =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [customers, searchTerm]);

    return (
        <div className="customer-list">
            <input
                type="text"
                placeholder="Search customers..."
                className="search-bar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredCustomers.map(customer => (
                <CustomerCard
                    key={customer.id}
                    customer={customer}
                    isSelected={customer.id === selectedCustomer?.id}
                    onClick={() => onSelectCustomer(customer)}
                />
            ))}
        </div>
    );
};

export default CustomerList;