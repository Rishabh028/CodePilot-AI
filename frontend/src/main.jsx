import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

import { GoogleOAuthProvider } from '@react-oauth/google'

const GOOGLE_CLIENT_ID = '253524691343-7l15bm4i046b1t8rm6p0rc9fqccq9i5s.apps.googleusercontent.com';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>
)
