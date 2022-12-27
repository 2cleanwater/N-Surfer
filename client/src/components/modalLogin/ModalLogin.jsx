import React from 'react'
import styles from './ModalLogin.module.css';
import { googleLogin, githubLogin,naverLogin } from '../../api/firebase';
import { observer } from 'mobx-react';
import useStore from '../../store/useStore';

const ModalLogin = ()=>{
  const {value} = useStore();
  return (
    <section className={styles.modalContainer}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={()=>{value.modalStore.closeModal()}}>X</button>
        <div className={styles.loginSection}>
          <button 
            className={`${styles.google} ${styles.loginButtons}`} 
            onClick={()=>{value.modalStore.closeModal(); value.authStore.googleLogin(); }}>Google</button>
          <button 
            className={`${styles.github} ${styles.loginButtons}`}
            onClick={()=>{value.modalStore.closeModal(); githubLogin(); }}>Github</button>
          <button 
            className={`${styles.naver} ${styles.loginButtons}`}
            onClick={()=>{value.modalStore.closeModal(); naverLogin(); }}>Naver</button>
        </div>    
      </div>
    </section>
  );
}
export default observer(ModalLogin);
