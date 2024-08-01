import React, { useState } from "react";
import CustomerList from "./components/CustomerList";
import CustomerDetails from "./components/CustomerDetails";
import { useCustomers } from "./hooks/useCustomer";
import { Customer } from "./types";
import "./App.css";

const App: React.FC = () => {
  const { customers, loading, error } = useCustomers();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <h2>Fetching 20 Customer Information...</h2>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="app">
      {(!isMobile || !selectedCustomer) && (
        <CustomerList
          customers={customers}
          selectedCustomer={selectedCustomer}
          onSelectCustomer={setSelectedCustomer}
        />
      )}
      {(!isMobile || selectedCustomer) && (
        <CustomerDetails
          customer={selectedCustomer}
          onBack={isMobile ? () => setSelectedCustomer(null) : undefined}
        />
      )}
    </div>
  );
};

export default App;
