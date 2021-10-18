export interface IPerson {
  fullName: string;
  doc: {
    id: string;
    type: string;
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
    postalCode: string;
  };
}
