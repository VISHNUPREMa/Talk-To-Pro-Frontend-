import React ,{ useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Routers from './router/router.jsx'
import { AuthProvider } from './pages/user/usercomponents/jwtAuthContext.jsx'
import { ProfileCard } from './pages/user/usercomponents/profileCard.jsx'



function App() {

  return (
    <>
     <AuthProvider>
     <Routers />


     </AuthProvider>
     
    {/* <ProfileCard/> */}



      
    </>
  )
  }


export default App
