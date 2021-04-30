export enum UserType {
  seller = 'seller',
  customer = 'customer',
}

export interface IUser {
  id: number;
  name: string;
  type: UserType;
  groupId: number;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMutateUserResult {
  action: 'cancel'|'submit';
  result: number;
}

export interface IUserMutateFormData {
  id?: number;
  name: string;
  type: UserType;
  groupId: number;
  email: string;
}

export interface IUserMutateRef {
  handleSubmit: () => Promise<IUserMutateFormData>;
}

export interface IAddUserProps {
  detail?: IUser;
}
