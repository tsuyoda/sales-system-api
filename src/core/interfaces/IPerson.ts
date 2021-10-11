export interface IPerson {
  name: string;
  doc: {
    id: string;
    type: 'F' | 'J';
  };
  contact: {
    email: string;
    tel: string;
    cel?: string;
  };
  address: {
    street: string;
    number: number;
    complement?: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
}
