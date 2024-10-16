import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Function1 from "./pages/Function1";
import FCalculator from "./pages/FCalculator";
import Pagenotfound from "./pages/Pagenotfound";
import HdbList from "./pages/hdbList.js";
import SignIn from "./pages/pagesInOut/sign-in/SignIn";
import Login from "./pages/Login.js";
import Testing from "./pages/Testing.js";
import { UserContextProvider } from "./store/UserContext.js";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="fcalculator" element={<FCalculator />} />
          <Route path="function1" element={<Function1 />} />
          <Route path="hdblist" element={<HdbList />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="login" element={<Login />} />
          <Route path="testing" element={<Testing />} />

          <Route path="*" element={<Pagenotfound />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
