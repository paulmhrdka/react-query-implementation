export interface IGeo {
  lat: string;
  lng: string;
}

export interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeo;
}

export interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddress;
  phone: string;
  website: string;
  company: ICompany;
}

export interface GetUsers {
  data: IUser[];
}

export interface GetUser {
  data: IUser;
}

export interface PayloadUser {
  name: string;
  username: string;
  email: string;
}

export interface IPaginate {
  page: number;
  limit: number;
}
