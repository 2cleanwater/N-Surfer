import React from 'react'
import { useState } from 'react';
import { createContext, useContext } from 'react'

export const ModalStateContext = createContext([]);
export const ModalDispathContext = createContext({
  open: () => {}, 
  close: () => {}
});

export function ModalContextProvider({children}) {

  const [isModalOpen, setIsModalOpen] = useState([]);
  const open = (Component, props) => {
    setIsModalOpen((modal)=>{
      return [...modal, {Component, props}];
    });
  }
  const close = (Component, props) => {
    setIsModalOpen((modal)=>{
      return modal.filter(modal => modal.Component!== Component);
    });
  }

  const dispatch = {open, close};

  return (
    <ModalDispathContext.Provider value={dispatch}>
      <ModalStateContext.Provider value={isModalOpen}>
        {children}  
      </ModalStateContext.Provider>
    </ModalDispathContext.Provider>
  );
}