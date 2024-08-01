import React from 'react';
import { Customer } from '../types';
import './CustomerCard.css';

interface Props {
    customer: Customer;
    isSelected: boolean;
    onClick: () => void;
}

const CustomerCard: React.FC<Props> = ({ customer, isSelected, onClick }) => {
    return (
        <div
            className={`customer-card ${isSelected ? 'selected' : ''}`}
            onClick={onClick}
        >
            <img src={customer.picture} alt={customer.name} className="customer-avatar" />
            <div className="customer-info">
                <p>{customer.title} {customer.name}</p>
            </div>
        </div>
    );
};

export default CustomerCard;