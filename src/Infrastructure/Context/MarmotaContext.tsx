import React, { useEffect } from "react";
import { Marmota } from "../Models/Marmota";
import { MarmotaController } from "../Controllers/ServiceController/MarmotaController";


export const MarmotaContext = React.createContext<any>(null);

export const MarmotaContextProvider: React.FunctionComponent<any> = ({
  children,
}) => {
  const [marmotaState, setMarmotaState] = React.useState(new Array<Marmota>());
  

  const marmotaController = new MarmotaController();

  useEffect(() => {
    marmotaController.getAllMarmotas().then(marmotas => {
        setMarmotaState(marmotas);
    }
    )
  }, [])
  
  const context = {
    marmota: [marmotaState, setMarmotaState],
    
  };

  return (
    <MarmotaContext.Provider value={context}>
      {children}
    </MarmotaContext.Provider>
  );
};
