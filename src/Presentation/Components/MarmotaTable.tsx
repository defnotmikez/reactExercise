import { useContext, useEffect, useState, useRef } from "react";
import { MarmotaContext } from "../../Infrastructure/Context/MarmotaContext";
import { MarmotaController } from "../../Infrastructure/Controllers/ServiceController/MarmotaController";
import { Marmota } from "../../Infrastructure/Models/Marmota";
import { TableHead } from "./TableHead";
import { TableBody } from "./MarmotaTableBody";



export const MarmotaTable = () => {
  const { marmota } = useContext(MarmotaContext);
  const [marmotaState, setMarmotaState] = marmota;
  
  return (
    <>
      {marmotaState.length > 0 && (
        <table>
          <TableHead />
          <TableBody />
        </table>
      )}
    </>
  );
};
