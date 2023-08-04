import { FormEvent, useContext, useRef, useState } from "react";
import { Marmota } from "../../Infrastructure/Models/Marmota";
import { MarmotaContext } from "../../Infrastructure/Context/MarmotaContext";
import { MarmotaController } from "../../Infrastructure/Controllers/ServiceController/MarmotaController";

export const Form = () => {
  const marmotaController = new MarmotaController();
  const { marmota } = useContext(MarmotaContext);
  const [marmotaState, setMarmotaState] = marmota;
  const nameInput = useRef<HTMLInputElement>(null);
  const ageInput = useRef<HTMLInputElement>(null);
  const heightInput = useRef<HTMLInputElement>(null);
  const weightInput = useRef<HTMLInputElement>(null);

  async function handleSubmit() {
    console.log(nameInput.current!.value)
    let data: Marmota = {
      id: "",
      name: nameInput.current!.value,
      age: parseFloat(ageInput.current!.value),
      height: parseFloat(heightInput.current!.value),
      weight: parseFloat(weightInput.current!.value),
      actions: false,
    };

    let res = await marmotaController.createMarmota(data);

    const marmota = [...marmotaState, res];
    setMarmotaState(marmota);
  }

  return (
    <>
      <div>
        <label htmlFor="name">Name</label>
        <input ref={nameInput} type="text" id="name" name="name"></input>
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input ref={ageInput} type="text" id="age" name="age"></input>
      </div>
      <div>
        <label htmlFor="height">Height</label>
        <input ref={heightInput} type="text" id="height" name="height"></input>
      </div>
      <div>
        <label htmlFor="weight">Weight</label>
        <input ref={weightInput} type="text" id="weight" name="weight"></input>
      </div>
      <button onClick={() => handleSubmit()}>Create</button>
    </>
  );
};
