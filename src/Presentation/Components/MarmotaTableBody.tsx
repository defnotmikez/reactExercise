import { useContext, useRef } from "react";
import { MarmotaContext } from "../../Infrastructure/Context/MarmotaContext";
import { MarmotaController } from "../../Infrastructure/Controllers/ServiceController/MarmotaController";
import { Marmota } from "../../Infrastructure/Models/Marmota";

let tempId: string;

export const TableBody = () => {
  const { marmota } = useContext(MarmotaContext);
  const [marmotaState, setMarmotaState] = marmota;
  const marmotaController = new MarmotaController();

  const nameInput = useRef<HTMLInputElement>(null);
  const ageInput = useRef<HTMLInputElement>(null);
  const heightInput = useRef<HTMLInputElement>(null);
  const weightInput = useRef<HTMLInputElement>(null);

  async function onDelete(item: Marmota) {
    let deleteRes = await marmotaController.deleteMarmota(item);
    

    if (deleteRes === "Entity has been deleted") {
      let getAllRes = await marmotaController.getAllMarmotas();
      setMarmotaState(getAllRes);
    }
  }

  async function onEditSubmit() {
    let data: Marmota = {
      id: tempId,
      name: nameInput.current!.value,
      age: parseFloat(ageInput.current!.value),
      height: parseFloat(heightInput.current!.value),
      weight: parseFloat(weightInput.current!.value),
      actions: false,
    };
    await marmotaController.updateMarmota(data);

    let getAllRes = await marmotaController.getAllMarmotas();
    setMarmotaState(getAllRes);
  }
  return (
    <>
      <tbody>
        {marmotaState.map((item: Marmota) => {
          if (item.actions) {
            return (
              <tr key={item.id}>
                <td>
                  <input
                    ref={nameInput}
                    type="text"
                    defaultValue={item.name}
                  ></input>
                </td>
                <td>
                  <input
                    ref={ageInput}
                    type="text"
                    defaultValue={item.age}
                  ></input>
                </td>
                <td>
                  <input
                    ref={heightInput}
                    type="text"
                    defaultValue={item.height}
                  ></input>
                </td>
                <td>
                  <input
                    ref={weightInput}
                    type="text"
                    defaultValue={item.weight}
                  ></input>
                </td>
                <td>
                  <button onClick={() => onEditSubmit()}>save</button>
                  <button
                    onClick={() => {
                      let marmotaCopy = marmotaState;
                      marmotaCopy.forEach((marmota: Marmota) => {
                        if (marmota.id == item.id) {
                          marmota.actions = false;
                        }
                      });
                      setMarmotaState([...marmotaCopy]);
                    }}
                  >
                    cancel
                  </button>
                </td>
              </tr>
            );
          }
          return (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.height}</td>
              <td>{item.weight}</td>
              <td>
                <button
                  onClick={() => {
                    let marmotaCopy = marmotaState;
                    marmotaCopy.forEach((marmota: Marmota) => {
                      marmota.actions = false;
                      if (marmota.id == item.id) {
                        marmota.actions = true;
                        tempId = marmota.id;
                      }
                    });
                    setMarmotaState([...marmotaCopy]);
                  }}
                >
                  edit
                </button>
                <button type="submit" onClick={() => onDelete(item)}>
                  delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </>
  );
};
