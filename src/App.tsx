import React, {useReducer} from 'react';
import axios from 'axios';
import AppReducer from './reducers/App.reducer'
import { AppState} from "./interfaces/AppInteface";
import TrackingList from "./TrackingList";

const initialState: AppState = {
  title: '',
  error: false,
  variant: 'error'
}

function App() {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const fetchApi = async () => {
    await axios.get('https://jsonplaceholder.typicode.com/todos/1').then(response => {
      dispatch({ type:'fetchSuccess', payload:response.data.title});
    }).catch(e => {
      dispatch({ type: 'fetchError' })
    })
  }

  const suma = (a: number, b: number): number => {
    return a+b;
  }

  return (
    <>
      <button onClick={fetchApi}>Fetch</button>
      <h2>{suma(4,5)}</h2>
      <h1 role="title">{state.title}</h1>
      {state.error ? <h1 role="error">Ocurrió un error</h1>: null}
      <TrackingList />
    </>
  );
}

export default App;
