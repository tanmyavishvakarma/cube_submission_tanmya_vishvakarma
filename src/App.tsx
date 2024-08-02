import React, { useState, useEffect } from 'react';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';
import { useCustomers } from './hooks/useCustomer';
import { Customer } from './types';
import './App.css';
const App: React.FC = () => {
  const { customers, loading, error } = useCustomers();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMenuOpen(false);
      } else if (!selectedCustomer) {
        setIsMenuOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedCustomer]);
  useEffect(() => {
    if (isMobile && !selectedCustomer) {
      setIsMenuOpen(true);
    }
  }, [isMobile, selectedCustomer]);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  if (loading) return <h2 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Fetching 20 Customer's Information...</h2>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="app">
      {isMobile && !isMenuOpen && (
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
      )}
      <div className={`sidebar ${(isMobile && isMenuOpen) || !isMobile ? 'open' : ''}`}>
        {isMobile && (
          <button className="close-menu" onClick={() => setIsMenuOpen(false)}>
            &times;
          </button>
        )}
        <CustomerList
          customers={customers}
          selectedCustomer={selectedCustomer}
          onSelectCustomer={(customer) => {
            setSelectedCustomer(customer);
            if (isMobile) setIsMenuOpen(false);
          }}
        />
      </div>
      <div className="main-content">
        {selectedCustomer ? (
          <CustomerDetails
            customer={selectedCustomer}
            onBack={() => {
              setSelectedCustomer(null);
              if (isMobile) setIsMenuOpen(true);
            }}
          />
        ) : (
          <div className="empty-state">
            Select a customer to view details
          </div>
        )}
      </div>
    </div>
  );
};
export default App;