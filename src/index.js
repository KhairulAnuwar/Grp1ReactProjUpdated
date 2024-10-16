import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBFg45eYXHPD0wJWTpyMagdTLFVOVeA3p0",
  authDomain: "project-react-sctp-grp1.firebaseapp.com",
  projectId: "project-react-sctp-grp1",
  storageBucket: "project-react-sctp-grp1.appspot.com",
  messagingSenderId: "511748686532",
  appId: "1:511748686532:web:60fc20c2e0636f684b3f91",
};

root.render(
  <GoogleOAuthProvider clientId="435750358779-n8spd0p14gt95egoscq9afjqno8gqlqk.apps.googleusercontent.com">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
