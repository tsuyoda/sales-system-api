export interface IProduct {
  id?: string;
  title: string;
  description: string;
  value: number;
  amount: number;
}

export interface IProductListData {
  title?: string;
}

export interface IDbProduct {
  _id: string;
  title: string;
  description: string;
  value: number;
  amount: number;
  createdAt: string;
  __v: number;
}
