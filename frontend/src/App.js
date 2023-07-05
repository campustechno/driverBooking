import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useReducer } from 'react';
import { initialState, reducer,  GlobalState} from './middlewares/global-states';
import User from "./pages/User";
import Navbar from './components/Navbar';
// import Driver from "./pages/Driver";


function App() {
  const [data, dispatch] = useReducer(reducer, initialState);


  return (
    <GlobalState.Provider value={{ data: data, dispatch: dispatch }}>
      <Navbar/>
      <User/>
      {/* <Driver/> */}
    </GlobalState.Provider>

  );
}

export default App;
