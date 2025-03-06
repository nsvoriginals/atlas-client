import { BrowserRouter,Route,Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Landing from "./pages/Landing"
export default function App(){


  return <main>
   <BrowserRouter>
   <Routes>
   <Route path="/"  element={<Landing/>} ></Route>
   <Route path="/user/profile"  element={<Dashboard/>} ></Route>
    <Route path="/auth/signup"  element={<Register/>} ></Route>
    <Route path="/auth/signin"  element={<Login/>} ></Route>
   </Routes>
   </BrowserRouter>
  </main>
}