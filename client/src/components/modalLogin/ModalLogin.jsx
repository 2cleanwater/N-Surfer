import React from 'react'
import styles from './ModalLogin.module.css';
import { googleLogin, githubLogin,naverLogin } from '../../api/firebase';
import { observer } from 'mobx-react';
import useStore from '../../store/useStore';

// function ModalLogin({isOpen, onCancel, onSubmit}) {
//   console.log("모달창 연다")
//   return (
//     <div isOpen={isOpen} className={styles.modal}>
//       <button className={styles.close} onClick={onCancel}>X</button>
//       <div className={styles.loginSection}>
//         <button className={`${styles.google} ${styles.loginButtons}`} onClick={()=>{onSubmit(); googleLogin(); }}>Google</button>
//         <button className={`${styles.github} ${styles.loginButtons}`} onClick={()=>{onSubmit(); githubLogin(); }}>Github</button>
//         <button className={`${styles.naver} ${styles.loginButtons}`} onClick={()=>{onSubmit(); naverLogin(); }}>Naver</button>
//       </div>    
//     </div>
    
//   );
// }

// export default ModalLogin

const ModalLogin = ()=>{
  const {value} = useStore();
  return (
      <div>
        제발요: {value.modalStore._IsModalOpen}
        <button onClick={()=>{value.modalStore.openModal()}}>헤이헤이</button>
      </div>
  );
}
export default observer(ModalLogin);
