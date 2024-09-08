import React from 'react';
import './App.scss';
import router from "./routers";
import { RouterProvider } from "react-router-dom";


const App: React.FC = () => {

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
