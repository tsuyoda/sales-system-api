export interface IAuth {
  token: string;
  expiresAt: Date;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    email: string;
  };
  role: {
    id: string;
    name: string;
    description?: string;
  };
}

export interface IAuthData {
  username: string;
  password: string;
}

export interface IDecodedJWT {
  id: string;
  name: string;
}
