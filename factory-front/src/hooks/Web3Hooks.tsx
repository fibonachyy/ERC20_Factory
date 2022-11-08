import { useState, useReducer, useEffect } from "react";
import { ethers } from "ethers";

interface IState {
  provider: any;
  signer: any;
}
enum reducerTypes {
  "SET_PROVIDER",
  "SET_SIGNER",
}
interface IDispatch {
  type: reducerTypes;
  payload: any;
}

const initialState: IState = {
  provider: null,
  signer: null,
};

function reducer(state: IState, { type, payload }: IDispatch) {
  switch (type) {
    case reducerTypes.SET_PROVIDER:
      return { ...state, provider: payload };
    case reducerTypes.SET_SIGNER:
      return { ...state, signer: payload };
    default:
      return state;
  }
}

function Web3Actions() {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    
  useEffect(() => {
    connectAndGetSigner();
  }, []);
    
    
  async function connectAndGetSigner() {
    const newProvider = new ethers.providers.Web3Provider(window.ethereum);
    dispatch({ type: reducerTypes.SET_PROVIDER, payload: newProvider });

    await newProvider.send("eth_requestAccounts", []);
    const signer = newProvider.getSigner();
    dispatch({ type: reducerTypes.SET_SIGNER, payload: signer });
  }

  return state;
}

export default Web3Actions;
