export interface Customer {
    id: string;
    name: string;
    title: string;
    email: string;
    phone: string;
    picture: string;
    address: {
        street: string;
        city: string;
        state: string;
        postcode: string;
    };
}