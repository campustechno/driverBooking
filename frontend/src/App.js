import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useReducer } from 'react';
import { initialState, reducer,  GlobalState} from './middlewares/global-states';
import UserProteced from './middlewares/UserProtected'
import User from "./pages/User";
import Home from './pages/Home';

import 'mapbox-gl/dist/mapbox-gl.css';

// import Driver from "./pages/Driver";


function App() {
  const [data, dispatch] = useReducer(reducer, initialState);

  return (
    <BrowserRouter>
      <GlobalState.Provider value={{ data: data, dispatch: dispatch }}>
        <Routes>
          <Route path="/" element={<UserProteced><Home/></UserProteced>} />
          <Route path="/user" element={<UserProteced><User/></UserProteced>} />
        </Routes>
      </GlobalState.Provider>
    </BrowserRouter>

  );
}

export default App;
