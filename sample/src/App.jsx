import React ,{ useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Routers from './router/router.jsx'
import { AuthProvider } from './pages/user/usercomponents/jwtAuthContext.jsx'




function App() {

  return (
    <>
     <AuthProvider>
     <Routers />


     </AuthProvider>
                          




      
    </>
  )
  }


export default App
