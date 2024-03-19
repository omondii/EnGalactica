import './App.css';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Header from "./components/Header.js";
import Home from "./components/Home.js"
import skyMap from "./components/skyMap.js";


function App() {
  return (
    <BrowserRouter>
    <div>
      <Header />
    </div>

    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/skymap' element={<skyMap />}></Route>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
