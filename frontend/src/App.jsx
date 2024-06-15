import Home from "./pages/Home"
import About from "./pages/About"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import Register from "./pages/Register"



import './App.css'
import {BrowserRouter as Router, Route,Routes} from "react-router-dom"
function App() {


  return (


    <Router>
    <Routes>
      <Route exact path="/" Component={Home} />
      <Route path="/about" Component={About} />
      <Route path="/login" Component={Login} />
      <Route path="/register" Component={Register} />

      <Route path="*" Component={NotFound} />

    </Routes>
  </Router>

  )
}

export default App
