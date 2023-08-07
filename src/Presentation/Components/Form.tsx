import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { Marmota } from "../../Infrastructure/Models/Marmota";
import { MarmotaContext } from "../../Infrastructure/Context/MarmotaContext";
import { MarmotaController } from "../../Infrastructure/Controllers/ServiceController/MarmotaController";
import { isNameInvalid } from "../../Validations/NameValidation";
import { isAgeInvalid } from "../../Validations/AgeValidation";

const errorState = {
  isNameErrorActive: false,
  isAgeErrorStateActive: false,
};

const AGE_ERROR_MESSAGE =
  "Age cannot be empty and must be a number greater than 0";
const NAME_ERROR_MESSAGE = "Name cannot be empty";

export const Form = () => {
  const marmotaController = new MarmotaController();
  const { marmota } = useContext(MarmotaContext);
  const [marmotaState, setMarmotaState] = marmota;
  const nameInput = useRef<HTMLInputElement>(null);
  const ageInput = useRef<HTMLInputElement>(null);
  const heightInput = useRef<HTMLInputElement>(null);
  const weightInput = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(errorState);

  function checkError() {
    const stateCopy = error;

    if (isAgeInvalid(nameInput.current!.value)){
      stateCopy.isNameErrorActive = true;
    } else {
      stateCopy.isNameErrorActive = false;
    }
      

    if (isAgeInvalid(ageInput.current!.value)) {
      stateCopy.isAgeErrorStateActive = true;
    } else {
      stateCopy.isAgeErrorStateActive = false;
    }
     

    setError({
      ...stateCopy,
    });

    if (error.isNameErrorActive || error.isAgeErrorStateActive) {
      return true;
    } else {
      return false;
    }
  }

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
      weight: weight,
      actions: false,
    };

    if (!checkError()) {
      await marmotaController.createMarmota(data);

      let getAllRes = await marmotaController.getAllMarmotas();
      setMarmotaState(getAllRes);
    }
  }

  return (
    <>
      <div>
        <label htmlFor="name">Name</label>
        <input
          ref={nameInput}
          type="text"
          id="name"
          name="name"
          required
        ></input>
        {error.isNameErrorActive && (
          <p style={{ color: "red" }}>{NAME_ERROR_MESSAGE}</p>
        )}
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input ref={ageInput} type="text" id="age" name="age" required></input>
        {error.isAgeErrorStateActive && (
          <p style={{ color: "red" }}>{AGE_ERROR_MESSAGE}</p>
        )}
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
