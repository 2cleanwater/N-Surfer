import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useAuthContext } from '../../context/AuthContext';
import User from '../user/User';
import { observer, Provider } from 'mobx-react';
import useStore from '../../store/useStore';

// export default function Navbar() {
//   const {user, googleLogin, githubLogin, logout} = useAuthContext();

//   // //모달창
//   // const {openModal} = useModals();
//   // const handleClick = () => {
//   //   openModal(ModalLogin, {
//   //     onSubmit: () => {
//   //       console.log("로직 처리...");
//   //     }
//   //   });
//   // };

//   return (
//     <header className={styles.header}>
//       <Link to='/' className={styles.mainLogo}>
//         <img className={styles.logo} src='/images/N-Surfer_Icon.png' alt="logo"/>
//         <h1 className={styles.title}>N-Surfer</h1>
//       </Link>
//       <div className={styles.menu}>
//         <Link to='/card/list' className={styles.menuItem}>카드목록</Link>
//         {user&&(<Link to='/card' className={styles.menuItem}>카드추가</Link>)}
//         {user? 
//           (<button className={styles.logout} onClick={logout}>Logout</button>) : 
//           (<button className={styles.logout} onClick={ModalLogin}>Login</button>)
//         }
//         {user&&<User user={user}/>}
//         {/* <Link to='/user/profile'><img className={styles.profile} src='/images/profile_logo.jpg' alt="profile" /></Link> */}
//       </div>
//       {/* {modalOpen&&<ModalLogin setModalOpen={setModalOpen}/>} */}
//     </header>
//   );
// }

const Navbar = ()=>{
  const {value} = useStore();
  const {user, googleLogin, githubLogin, logout} = useAuthContext();
  return (
    <header className={styles.header}>
      <Link to='/' className={styles.mainLogo}>
        <img className={styles.logo} src='/images/N-Surfer_Icon.png' alt="logo"/>
        <h1 className={styles.title}>N-Surfer</h1>
      </Link>

      <div className={styles.menu}>
        <Link to='/card/list' className={styles.menuItem}>카드목록</Link>
        {user&&(<Link to='/card' className={styles.menuItem}>카드추가</Link>)}
        {user? 
          (<button className={styles.logout} onClick={logout}>Logout</button>) : 
          (<button className={styles.logout} onClick={()=>{value.modalStore.openModal()}}>Login</button>)
        }
        {user&&<User user={user}/>}
        {/* <Link to='/user/profile'><img className={styles.profile} src='/images/profile_logo.jpg' alt="profile" /></Link> */}
      </div>
      {/* {modalOpen&&<ModalLogin setModalOpen={setModalOpen}/>} */}
    </header>
  );
}
export default observer(Navbar);