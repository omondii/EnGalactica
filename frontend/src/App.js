import './App.css';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Header from "./components/Header.js";
import Home from "./components/Home.js"

function App() {
  return (
    <BrowserRouter>
    <div>
      <Header />
    </div>

    <Routes>
      <Route path='/' element={<Home />}></Route>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
