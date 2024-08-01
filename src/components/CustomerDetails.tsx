import React from 'react';
import PhotoGrid from './PhtotoGrid';
import { Customer } from '../types';
import './CustomerDetails.css';

interface Props {
    customer: Customer | null;
    onBack?: () => void;
}

const CustomerDetails: React.FC<Props> = ({ customer, onBack }) => {
    if (!customer) return <div className="customer-details empty">Please Select a Customer</div>;

    return (
        <div className="customer-details">
            {onBack && (
                <button onClick={onBack} className="back-button">
                    &larr; Open List
                </button>
            )}
            <div className="customer-header">
                <img src={customer.picture} alt={customer.name} className="customer-avatar large" />
                <div className="customer-info">
                    <h2 className="customer-title">{customer.title} {customer.name}</h2>
                </div>
            </div>
            <div className="customer-content">
                <div className="info-group">
                    <h3>Contact Information</h3>
                    <p><strong>Email:</strong> {customer.email}</p>
                    <p><strong>Phone:</strong> {customer.phone}</p>
                </div>
                <div className="info-group">
                    <h3>Address</h3>
                    <p>{customer.address.street}</p>
                    <p>{customer.address.city}, {customer.address.state} {customer.address.postcode}</p>
                </div>
            </div>
            <PhotoGrid customerId={customer.id} />
        </div>
    );
};

export default CustomerDetails;