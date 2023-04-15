import React, { useState, createContext } from "react";

const CamContext = createContext();

function CamProvider({ children }) {
  const [cam, setCam] = useState(true);
  const toggleCam = () => {
    setCam(cam == true ? false : true);
  };
  const value = {
    cam,
    toggleCam,
  };
  return <CamContext.Provider value={value}>{children}</CamContext.Provider>;
}

export { CamProvider, CamContext };
