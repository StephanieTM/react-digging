import axios from 'axios';
import { IUser, IUserMutateFormData } from './interface';

export const getAllUsersService = (): Promise<IUser[]> => axios.post('/api/basic/user/list', {});

export const addUserService = (payload: IUserMutateFormData): Promise<number> => axios.post('/api/basic/user/create', payload);

export const updateUserService = (payload: IUserMutateFormData): Promise<number> => axios.post('/api/basic/user/update', payload);

export const deleteUserService = (payload: Pick<IUser, 'id'>): Promise<boolean> => axios.post('/api/basic/user/delete', payload);
