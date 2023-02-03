import axios from 'axios';
import React, { useState } from 'react'

export async function FileUpload(file: File, url:string) {
  const formData = new FormData();
  formData.append("image", file);
  try{
    const res = await axios(url,{
      method: 'PUT',
      headers: {"Content-Type": "multipart/form-data"},
      // body: formData
    })
  }catch(error){
    alert("업로드 실패");
    console.log(error);
  }
}

