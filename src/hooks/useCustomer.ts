import { useState, useEffect } from 'react';
import { Customer } from '../types';
import { fetchCustomers } from '../services/api';

export const useCustomers = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadCustomers = async () => {
            try {
                const data = await fetchCustomers();
                setCustomers(data);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('An error occurred'));
            } finally {
                setLoading(false);
            }
        };

        loadCustomers();
    }, []);

    return { customers, loading, error };
};