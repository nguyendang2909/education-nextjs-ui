import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCurrentUserThunk } from '../../store/reducers/user.reducer';

export const AuthProvider: FC = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUserThunk());
  }, [dispatch]);

  return <>{children}</>;
};
