import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './Components/Landing';
import Dash from './Components/Dash';
import One from './Components/One';
import AD from "./Components/A-D";
import EH from "./Components/E-H";
import IL from "./Components/I-L";
import MP from "./Components/M-P";
import QT from "./Components/Q-T";
import UZ from "./Components/U-Z";

function App() {
  return (
  <div style={{backgroundColor: "rgb(11, 11, 11)"}}>
      <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/dash' element={<Dash/>} />
          <Route path='/ad' element={<AD/>} />
          <Route path='/eh' element={<EH/>} />
          <Route path='/il' element={<IL/>} />
          <Route path='/mp' element={<MP/>} />
          <Route path='/qt' element={<QT/>} />
          <Route path='/uz' element={<UZ/>} />
          <Route path='/:id' element={<One/>} />
      </Routes>
    </div>
  );
}

export default App;
