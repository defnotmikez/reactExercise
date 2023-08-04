import { FormEvent, useContext, useState } from "react";
import { Marmota } from "../../Infrastructure/Models/Marmota";
import { MarmotaContext } from "../../Infrastructure/Context/MarmotaContext";
import { MarmotaController } from "../../Infrastructure/Controllers/ServiceController/MarmotaController";

export const Form = () => {
  const marmotaController = new MarmotaController();
  const { marmota } = useContext(MarmotaContext);
  const [marmotaState, setMarmotaState] = marmota;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { name, age, height, weight } =
      event.target as typeof event.target & {
        name: { value: string };
        age: { value: number };
        height: { value: number };
        weight: { value: number };
      };

    let data: Marmota = {
      id: "",
      name: name.value,
      age: age.value,
      height: height.value,
      weight: weight.value,
      actions: false,
    };

    let res = await marmotaController.createMarmota(data);

    const marmota = [...marmotaState, res];
    setMarmotaState(marmota);
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name"></input>
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input type="text" id="age" name="age"></input>
      </div>
      <div>
        <label htmlFor="height">Height</label>
        <input type="text" id="height" name="height"></input>
      </div>
      <div>
        <label htmlFor="weight">Weight</label>
        <input type="text" id="weight" name="weight"></input>
      </div>
      <button type="submit">Create</button>
    </form>
  );
};
