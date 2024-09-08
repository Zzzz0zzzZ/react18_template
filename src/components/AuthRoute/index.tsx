import React from "react";

interface IAuthRouteProps {
  children: React.ReactElement; // 需要验证的组件
}

const AuthRoute: React.FC<IAuthRouteProps> = ({ children }) => {

  return <>{ children }</>
};

export default AuthRoute;
