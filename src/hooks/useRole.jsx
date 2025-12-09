import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
  const {user , loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {data:role, isLoading: iseRoleLoading} =useQuery({
    enabled:!loading && !!user?.email,
    queryKey:['role',user?.email],
    queryFn:async () => {
        const {data } =await axiosSecure(`/user/role/${user?.email}`)
        return data.role
    }
  })

  return {role,iseRoleLoading}
};

export default useRole;