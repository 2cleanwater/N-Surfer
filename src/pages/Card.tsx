import CardDetail from '@components/cardDetail/CardDetail'
import CardDetailEditable from '@components/cardDetail/CardDetailEditable';
import { useRootStore } from '@provider/rootContext';
import { OceanData } from '@store/OceanStore';
import CardDetailNull from '@components/cardDetail/CardDetailNull';

import CardReply from '@components/cardComment/CardReply';

import { useEffect, useState } from 'react';

import { Box, IconButton, Tooltip } from '@mui/material';

import SettingsIcon from '@mui/icons-material/Settings';

function Card() {
  const value = useRootStore()!;
  //카드 파라미터
  const cardId:string = window.location.pathname.split("/").splice(-1)[0];

  const [oceanData,setOceanData]= useState<OceanData>({} as OceanData);
  const [isEditing, setIsEditing]= useState<boolean>(false);

  // server data
  useEffect(()=>{
    value.modalStore.openModal();
    value?.oceanStore.getOcean(cardId, setOceanData);
  },[isEditing]);

  useEffect(()=>{
    !value?.oceanStore.isOceanLoading&&value?.modalStore.closeModal();
    return () => {
      value.modalStore.closeModal();
    };
  },[value?.oceanStore.isOceanLoading,oceanData]);

  return (
    <Box sx={{width:"92%", margin:"auto", alignContent:"center", alignItems:"center", justifyContent:"center", justifyItems:"center", textAlign:"center", display:"flex", position:"relative"}}>
      {oceanData.title? 
      <>
        {oceanData.user.username==value?.profileStore.userData.nickname&&
        <Tooltip placement="top" title={<div style={{fontSize:"15px"}}>설정</div>}>
          <IconButton type="submit" size="medium" sx={{position:"absolute", top:"1em", right:"1em", color: "white", bgcolor:"#9B9A97", zIndex:"10",
            "&:hover":{
              "@keyframes rotate": {
                "100%": {
                  transform: "scale(1.1) rotate(180deg)"
                },
              },
              bgcolor:"#9B9A97",
              animation: "rotate 1s infinite",
              cursor : "pointer"
            },
            animation: isEditing?"rotate 1s infinite":"",
            }} onClick={(e)=>{setIsEditing(!isEditing);}}>
            <SettingsIcon fontSize="medium" />
          </IconButton>
        </Tooltip>}
        {isEditing?
          (<Box sx={{display:"flex", flexDirection:"column", width:"100%"}}>
              <CardDetailEditable oceanData={oceanData} setIsEditing={setIsEditing}/>
            </Box>):
          (<Box sx={{display:"flex", flexDirection:"column", width:"100%"}}>
            <CardDetail oceanData={oceanData}/>
            <CardReply cardId={oceanData.cardId}/>
          </Box>)}
      </>:
      <>
      {value.modalStore._IsModalOpen?<CardDetailNull/>:<></>}
      </>
      }
    </Box>
  )
}

export default Card;