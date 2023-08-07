import { FormEvent, useContext, useRef, useState } from "react";
import { Marmota } from "../../Infrastructure/Models/Marmota";
import { MarmotaContext } from "../../Infrastructure/Context/MarmotaContext";
import { MarmotaController } from "../../Infrastructure/Controllers/ServiceController/MarmotaController";
import { nameValidation } from "../../Validations/NameValidation";
import { ageValidation } from "../../Validations/AgeValidation";


export const Form = () => {
  const marmotaController = new MarmotaController();
  const { marmota} = useContext(MarmotaContext);
  const [marmotaState, setMarmotaState] = marmota;
  const nameInput = useRef<HTMLInputElement>(null);
  const ageInput = useRef<HTMLInputElement>(null);
  const heightInput = useRef<HTMLInputElement>(null);
  const weightInput = useRef<HTMLInputElement>(null);
 
  

  async function handleSubmit() {
    let name = nameInput.current!.value;
    let age = parseFloat(ageInput.current!.value);
    let height = parseFloat(heightInput.current!.value);
    let weight = parseFloat(weightInput.current!.value);
    

    let data: Marmota = {
      id: "",
      name: name,
      age: age,
      height: height,
      weight: weight ,
      actions: false,
    };

    await marmotaController.createMarmota(data);

    let getAllRes = await marmotaController.getAllMarmotas();
    setMarmotaState(getAllRes);
  }
  
  return (
    <>
      <div>
        <label htmlFor="name">Name</label>
        <input ref={nameInput} type="text" id="name" name="name"></input>
        {nameValidation(nameInput.current?.value) ? <p style={{color : "red"}}>Name cannot be empty</p> : null}
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input ref={ageInput} type="text" id="age" name="age"></input>
        {ageValidation(ageInput.current?.value) ? <p style={{color : "red"}}>Age cannot be empty and must be a number greater than 0</p> : null}
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
