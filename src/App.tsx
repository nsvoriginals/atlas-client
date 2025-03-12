import { BrowserRouter,Route,Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import {Dashboard} from "./pages/ADashboard"
import Landing from "./pages/Landing"

import { ResumeGenerator } from "./components/ResumeGenerator"
export default function App(){


  return <main className="m-0 p-0 box-border flex items-center justify-center  font-satoshi ">
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