
// import GuestList from './state/GuestList'
// import UserSearch from './state/UserSearch'
// import EventComponent from './events/EventComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Booking from './components/Booking'
import SignIn from './pages/SingIn'
import React from 'react'

function App() {

  return (
 
<div >
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/book' element={<Booking/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/signin' element={<SignIn/>}/>
  </Routes>
  </BrowserRouter>
  </div>
  )
}

export default App
