import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import {
  useGetUser,
  useGetUserPaginate,
  useGetUsers,
  usePostUser,
} from '../fetcher';
import { IPaginate, PayloadUser } from '../interfaces';
import { useQueryClient } from '@tanstack/react-query';

const useCustom = () => {
  const queryClient = useQueryClient();
  // State
  const [selectedId, setSelectedId] = useState<number>(0);
  const [formData, setFormData] = useState<PayloadUser>({
    name: '',
    username: '',
    email: '',
  });
  const [filter, setFilter] = useState<IPaginate>({
    page: 1,
    limit: 2,
  });

  const onSuccessPost = async () => {
    console.log('run');
    await queryClient.invalidateQueries({ queryKey: ['getUsers'] });
  };

  // Queries
  const {
    data: dataList,
    isLoading: isLoadingList,
    error: errorList,
  } = useGetUsers();

  const {
    data: dataDetail,
    isLoading: isLoadingDetail,
    error: errorDetail,
  } = useGetUser(selectedId);

  const {
    data: dataPaginate,
    isLoading: isLoadingPaginate,
    error: errorPaginate,
    isPreviousData,
    isFetching,
  } = useGetUserPaginate(filter);

  // Mutation
  const { mutate, isSuccess } = usePostUser(onSuccessPost);

  // Callbacks
  const onClickUser = useCallback((id: number) => {
    setSelectedId(id);
  }, []);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutate(formData);
      setFormData({
        name: '',
        username: '',
        email: '',
      });
    },
    [formData, mutate]
  );

  const onClickPaginate = useCallback((page: number) => {
    if (page > 0) {
      setFilter((prev) => {
        return {
          ...prev,
          page,
        };
      });
    }
  }, []);

  return {
    data: {
      selectedId,
      dataList,
      dataDetail,
      errorList,
      errorDetail,
      isLoadingList,
      isLoadingDetail,
      formData,
      isSuccess,
      dataPaginate,
      isLoadingPaginate,
      errorPaginate,
      filter,
      isPreviousData,
      isFetching,
    },
    methods: {
      onClickUser,
      handleSubmit,
      handleChange,
      onClickPaginate,
    },
  };
};

export default useCustom;
