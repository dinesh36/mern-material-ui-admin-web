import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Backdrop, CircularProgress } from '@mui/material';

export default function GlobalLoader() {
  const isLoadingGlobally = useSelector<RootState>(
    (state: RootState) => state.layout.isLoadingGlobally
  ) as boolean;
  return (
    isLoadingGlobally && (
      <Backdrop open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  );
}
