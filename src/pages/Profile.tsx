import CardDetail from '@/components/CardDetail';
import Wave from '@/components/Wave';
import UserProfile from '@/components/UserProfile';
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