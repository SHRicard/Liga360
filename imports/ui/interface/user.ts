export interface IUserData {
  emails: {
    address: string;
    verified: boolean;
  };
  password?: string;
  profile: {
    nombre: string;
    apellido: string;
    avatar?: string;
  };
  createdAt: Date;
}

export interface IRegisterData {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  confirmPassword: string;
}
