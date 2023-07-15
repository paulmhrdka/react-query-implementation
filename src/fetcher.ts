import axios, { AxiosError } from 'axios';
import { GetUser, GetUsers, IPaginate, PayloadUser } from './interfaces';
import {
  useMutation,
  useQuery,
} from '@tanstack/react-query';

const BASE_URL = String(import.meta.env.VITE_API_BASE_URL);


const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response as GetUsers;
  } catch (error) {
    throw error as AxiosError;
  }
};

const getUserPaginate = async (filter: IPaginate) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/users?_page=${filter.page}&_limit=${filter.limit}`
    );
    return response as GetUsers;
  } catch (error) {
    throw error as AxiosError;
  }
};

const getUser = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${id}`);
    return response as GetUser;
  } catch (error) {
    throw error as AxiosError;
  }
};

const postUser = async (payload: PayloadUser) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, payload, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export const useGetUsers = () =>
  useQuery<GetUsers, AxiosError>({
    queryKey: ['getUsers'], // identifier query name for caching data
    queryFn: async () => await getUsers(),
    retry: 3,
  });

export const useGetUser = (id: number) =>
  useQuery<GetUser, AxiosError>({
    queryKey: ['getUser', id],
    queryFn: async () => await getUser(id),
    enabled: id > 0,
    refetchOnWindowFocus: false,
  });

export const useGetUserPaginate = (filter: IPaginate) =>
  useQuery<GetUsers, AxiosError>({
    queryKey: ['getUserPaginate', filter],
    queryFn: async () => await getUserPaginate(filter),
    enabled: !!filter,
    refetchOnWindowFocus: false,
    keepPreviousData: true
  });

export const usePostUser = (onSuccess: () => Promise<void>) =>
  useMutation({
    mutationKey: ['postUser'],
    mutationFn: async (payload: PayloadUser) => await postUser(payload),
    onSuccess: onSuccess
  });
