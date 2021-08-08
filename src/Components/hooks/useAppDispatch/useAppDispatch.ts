import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../ducks';

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
