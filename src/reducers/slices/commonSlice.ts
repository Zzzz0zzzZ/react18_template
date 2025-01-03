import { createSlice } from '@reduxjs/toolkit';

interface State {
  username: string, // 是否登录
}

const initialState: State = {
  username: 'Zzzz0zzzZ',
}

export const commonSlice = createSlice({
  name: 'common', // 命名空间，在调用action的时候会默认的设置为action的前缀
  // 初始值
  initialState,
  // 这里的属性会自动的导出为actions，在组件中可以直接通过dispatch进行触发
  reducers: {
    setUsername: (state, {payload}) => { state.username = payload },
  },
});

// 导出actions
export const {
  setUsername,
} = commonSlice.actions;
export default commonSlice.reducer; // 导出reducer，在创建store时使用到