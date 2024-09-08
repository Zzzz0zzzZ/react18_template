import React, { useCallback } from 'react';
import "./index.scss"
import { useAppDispatch, useAppSelector } from "../hooks/useReduxState";
import { Button } from "antd";
import { setUsername } from "../reducers/slices/commonSlice";
import apis from "../apis";



const PageLayout: React.FC = () => {

  const dispatch = useAppDispatch()
  const username = useAppSelector(state => state.common.username)
  const handleChangeUsername = useCallback(()=>{
    dispatch(setUsername('Teashirtt'))
  }, [])
  const handleGetUserinfo = useCallback(async ()=>{
    const res = await apis.userLogin({username: 'zzz', password: '123456'})
    console.log('===> res', res)
  }, [])

  return (
    <div className={'page-layout'}>
      <h1>Hi, { username }'s Developer</h1>
      <Button className={'btn'} type={'link'} onClick={handleChangeUsername}>1. Change(Redux Process)</Button>
      <Button className={'btn'} type={'link'} onClick={handleGetUserinfo}>2. GetUserinfo(Api Process)</Button>
    </div>
  );
};

export default PageLayout;