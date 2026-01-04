import { Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Navbar from './component/Navbar.jsx'
import Home from './component/Home.jsx'
import Login from './component/Login.jsx'
import Signup from './component/Signup.jsx'
import Restartpassword from './component/restartPassword.jsx'



function App() {

  return (
    <>
     <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        {/* <Route path="/about" element={<About/>} /> */}
        {/* <Route path="/contact" element={<Contact/>} /> */}
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/restartpassword" element={<Restartpassword/>} />
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
