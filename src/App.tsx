import { Outlet } from 'react-router-dom';
import Navbar from '@components/Navbar'
import { observer } from 'mobx-react';
import ModalLogin from '@components/ModalLogin';
import { useRootStore } from '@provider/rootContext';
import { Box } from '@mui/material';

const App = ()=>{
  const value = useRootStore()!;
  return (
    <>
      <Navbar />
      <Box sx={{}}>
        <Outlet />
      </Box>
      {value.modalStore._IsModalOpen&&<ModalLogin/>}
    </>
  )
}

export default observer(App);