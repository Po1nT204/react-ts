import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { clearError, selectErrorMessage } from '../../redux/slices/errorSlice';
import 'react-toastify/dist/ReactToastify.css';
import { FC, useEffect } from 'react';
import { AppDispatch } from '../../redux/store';

const Error: FC = () => {
  const errorMessage: string = useSelector(selectErrorMessage);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(clearError());
    }
  }, [errorMessage, dispatch]);

  return <ToastContainer position="top-right" autoClose={2000} />;
};

export default Error;
