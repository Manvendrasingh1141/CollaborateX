import Login from "./Authentication/Login"
import Register from "./Authentication/Register"
import BoardContainer from "./Boards/BoardConatiner"
import About from "./Components/About"
import ExploreContainer from "./Explore/ExploreContainer"
import Landing from "./LandingPage/Landing"
import {BrowserRouter, Route,Routes} from 'react-router-dom'
import MainPage from "./MainPage/MainPage"
import Profile from "./Recent/Profile"
import SavedBoards from "./Boards/SavedBoards"
function App(){
  return(
  <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/collaborateX" element={<MainPage/>}/>
      <Route path="/boards" element={<BoardContainer/>}/>
      <Route path="/explore" element={<ExploreContainer/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/savedboards" element={<SavedBoards/>}/>
    </Routes>
    </BrowserRouter>
  </div>
  )
} 
export default App