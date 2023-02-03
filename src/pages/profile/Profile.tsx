import CardDetail from '../../components/card/CardDetail';
import Wave from '../../components/wave/Wave';
import UserProfile from '../../components/userProfile/UserProfile';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';


const Profile = () => {
  return (
    <Box sx={{display:"flex"}}>
      <UserProfile/>
      <Box sx={{border:"1px solid", width:"500px"}}>
        <Wave/>
        <CardDetail/>
        <Link to='/card/list'><button>더보기</button></Link>
      </Box>
    </Box>
  )
}

export default Profile;