import {Route,Routes} from "react-router-dom"
import Navbar from "./components/Navbar"
import "./App.css"
import Login from "./components/Login"
import Singup from "./components/Singup"
import DashBoard from "./components/DashBoard"
import Protected from "./components/Protected"
import ShowNotes from "./components/ShowNotes"
import CreateNotes from "./components/CreateNotes"
import Upgrade from "./components/Upgrade"
import Checkout from "./components/Checkout"

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<DashBoard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Singup/>}/>
        <Route path="/shownotes" element={<Protected Component={ShowNotes}/>}/>
        <Route path="/createNotes" element={<Protected Component={CreateNotes}/>}/>
        <Route path="/upgrade" element={<Upgrade/>}/>
        <Route path='/checkout' element={<Protected Component={Checkout}/>}/>
        
        
        
      </Routes>
  
    </div>
  )
}

export default App