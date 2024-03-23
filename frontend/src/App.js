import './App.css';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Header from "./components/Header.js";
import Home from "./components/Home.js"
import Skymap from "./components/Skymap.js";


function App() {
  return (
    <BrowserRouter>
    <div>
      <Header />
    </div>

    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/Skymap' element={<Skymap />}></Route>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
