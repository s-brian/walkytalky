import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './pages/login';
import Loggedin from './pages/loggedin';
import Protected from "./components/Protected";


function App() {
  

  return (
    <Router>
      <Routes>
        <Route element={<Protected />}>
          <Route path='loggedin' element={<Loggedin />} />
        </Route>
        <Route path='/' element={<Login />}/>
      </Routes>
    </Router>

    
    
  );
}

//TODO: how to implement group chat, facial recognition login project
export default App;
