import CardDetail from '@/components/CardDetail'
import CardDetailEditable from '@/components/CardDetailEditable';
import { useRootStore } from '@/provider/rootContext';
import { OceanData } from '@/store/OceanStore';
import { Box, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';

function Card() {
  const value = useRootStore()!;
  //카드 파라미터
  const cardId:string = window.location.pathname.split("/").splice(-1)[0];

  const [oceanData,setOceanData]= useState<OceanData>({} as OceanData);
  const [isEditing, setIsEditing]= useState<boolean>(false);

  // server data
  useEffect(()=>{
    value?.oceanStore.getOcean(cardId, setOceanData);
  },[]);

  return (
    <Box sx={{alignContent:"center", alignItems:"center", justifyContent:"center", justifyItems:"center", textAlign:"center", display:"flex", position:"relative"}}>
      {oceanData.title&& <div>
        {oceanData.nickname==value?.profileStore.userData.nickname&&
        <IconButton type="submit" size="medium" sx={{position:"absolute", top:"10px", right:"9%", color: "white", bgcolor:"#9B9A97", zIndex:"1000",
            "&:hover":{
              "@keyframes rotate": {
                "100%": {
                  transform: "rotate(180deg)"
                }
              },
              animation: "rotate 1s infinite",
              cursor : "pointer"
            },
            animation: isEditing?"rotate 1s infinite":"",
          }} onClick={(e)=>{setIsEditing(!isEditing);}}>
          <SettingsIcon fontSize="medium" />
        </IconButton>}
        {isEditing?
          (<CardDetailEditable oceanData={oceanData}/>):
          (<CardDetail oceanData={oceanData}/>)}
      </div>}
    </Box>
  )
}

export default Card;