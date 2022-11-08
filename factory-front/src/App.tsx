import React, { useEffect, useState } from "react";

import "./App.css";
import Web3Actions from "./hooks/Web3Hooks";
function App() {
  const state = Web3Actions();
  const [formState, setFormState] = useState({})
  useEffect(() => {
    console.log(state);
  }, [state]);
  useEffect(()=>{console.log(formState)},[formState])
  function handleChange(event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
    setFormState((prev) => ({...prev, [event.target.name]: event.target.value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    
    event.preventDefault();

    
  }


  return (
    <div className="App">
      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          Token Name:
          <input type="text" name="name" onChange={handleChange} />
        </label>
        <label>
          Token Symbol:
          <input type="text" name="symbol" onChange={handleChange} />
        </label>
        <label>
          Initial Supply of token:
          <input type="text" name="initialSupply" onChange={handleChange} />
        </label>
          <input type="submit" value="Submit" />
          
      </form>
    </div>
  );
}

export default App;
