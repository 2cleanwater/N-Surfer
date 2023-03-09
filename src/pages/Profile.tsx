import CardDetail from '@/components/CardDetail';
import Wave from '@/components/Wave';
import UserProfile from '@/components/UserProfile';
import { Link, useSearchParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { useRootStore } from '@/provider/rootContext';
import EditProfile from '@/components/EditProfile';

const Profile = () => {
  const value = useRootStore()!;
  const [searchParams, setSearchParams] = useSearchParams();
  const userName:string = searchParams.get("userName")!;

  return (
    <Box sx={{display:"flex"}}>
      {userName===value.profileStore.userData.userName?
      (<EditProfile/>):
      (<UserProfile userName={userName}/>)}
      {/* <UserProfile userName={userName}/> */}
      <Box sx={{border:"1px solid", width:"500px"}}>
        {/* <Wave userName={userName}/>
        <CardDetail userName={userName}/> */}
        <Wave/>
        <CardDetail/>
        <Link to={`/card/list?userName=${userName}`}><button>더보기</button></Link>
      </Box>
    </Box>
  )
}

export default Profile; 