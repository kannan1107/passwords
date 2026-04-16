import { Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Navbar from './component/Navbar.jsx'
import Home from './component/Home.jsx'
import Login from './component/Login.jsx'
import Signup from './component/Signup.jsx'
import RestartPassword from './component/restartPassword.jsx'
import UpdatePassword from './component/updatePassword.jsx'




function App() {

  return (
    <>
     <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        {/* <Route path="/about" element={<About/>} /> */}
        {/* <Route path="/contact" element={<Contact/>} /> */}
       
        <Route path="/signup" element={<Signup/>} />
        <Route path="/restartpassword" element={<RestartPassword/>} />
        <Route path="*" element={"404 Not Found"} />
        <Route path='updatepassword' element={<UpdatePassword/>} />
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
