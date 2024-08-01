import { Customer } from '../types';

export const fetchCustomers = async (count: number = 20): Promise<Customer[]> => {
    const response = await fetch(`https://randomuser.me/api/?results=${count}`);
    const data = await response.json();
    return data.results.map((result: any) => ({
        id: result.login.uuid,
        name: `${result.name.first} ${result.name.last}`,
        title: result.name.title,
        email: result.email,
        phone: result.phone,
        picture: result.picture.large,
        address: {
            street: `${result.location.street.number} ${result.location.street.name}`,
            city: result.location.city,
            state: result.location.state,
            postcode: result.location.postcode,
        },
    }));
};