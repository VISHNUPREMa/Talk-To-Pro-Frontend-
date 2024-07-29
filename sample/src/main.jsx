import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { EmailProvider } from './pages/contexts/userEmailContext.jsx';
import { UserProvider } from './pages/contexts/userDataContext.jsx';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SearchProvider } from './pages/user/context/searchContext.jsx';
import {ProfileProvider} from './pages/user/context/profileContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <GoogleOAuthProvider clientId='1034584448930-77e3thcvocj82v6nio2hd034ek2sgsmb.apps.googleusercontent.com'>
      <EmailProvider>
        <UserProvider>
          <SearchProvider>
            <ProfileProvider>

          <App />

          </ProfileProvider>
          </SearchProvider>
        </UserProvider>
      </EmailProvider>
    </GoogleOAuthProvider>

);
