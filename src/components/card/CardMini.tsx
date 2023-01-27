import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface cardMiniPropsType{
  cardId: string;
}

const CardMini = ({cardId}:cardMiniPropsType) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{border:"solid 1px", width: 300, height: 400, boxShadow: 3, m:2, p:1, borderRadius:"0.5em", ":hover": {transform: "scale(1.02)"}}}
      onClick={()=>{navigate(`/card/${cardId}`)}}
    >
      <h2>{cardId}의 제목입니다</h2>
      <Box component="img" src='../../../testImages/testCat.jpg' 
      sx={{width: 300, height: 200, objectFit: 'cover'}} alt='CardImg'></Box>
      <Box>고양이는정말귀엽습니다고양이는뒷목을잡으면야옹하고웁니다야옹야옹아무것도안한고양이는꼭저를보는것같습니다찔리는마음입니다.</Box>
    </Box>
  )
}

export default CardMini