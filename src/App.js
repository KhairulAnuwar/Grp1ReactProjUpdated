import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FCalculator from "./pages/FCalculator";
import Pagenotfound from "./pages/Pagenotfound";
import HdbList from "./pages/hdbList.js";
import SignIn from "./pages/pagesInOut/sign-in/SignIn";
import Login from "./pages/Login.js";
import { UserContextProvider } from "./store/UserContext.js";
import Favorites from "./pages/Favorites.js";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="fcalculator" element={<FCalculator />} />
          <Route path="favorite" element={<Favorites />} />
          <Route path="hdblist" element={<HdbList />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="login" element={<Login />} />

          <Route path="*" element={<Pagenotfound />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
