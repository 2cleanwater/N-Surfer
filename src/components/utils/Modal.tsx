import { observer } from 'mobx-react';

import { Box } from '@mui/material';
import ModalLogin from './ModalLogin';
import Loading from './Loading';
import { useRootStore } from '@provider/rootContext';

const Modal= ()=>{
  const value = useRootStore();
  return (
    <Box sx={{ position: "fixed", top: "0%", left: "0%", zIndex: 999, width: "100%", height: "100%",display: "flex",alignItems: "center", justifyContent: "center", backdropFilter: "blur(5px)"}}>
      {value?.authStore.isLoginLoading&&<ModalLogin/>}
      {value?.oceanStore.isOceanLoading&&<Box sx={{display: "flex",alignItems: "center",justifyContent: "center",width:"100em"}}>
        <Loading/></Box>}
      {value?.profileStore.isUserDataLoading&&<Box sx={{display: "flex",alignItems: "center",justifyContent: "center",width:"100em"}}>
      <Loading/></Box>}
    </Box>
  );
}
export default observer(Modal);
