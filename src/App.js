import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/profile";
import Home from "./pages/home";
import SignUpPage from "./pages/sign-up";
import SignInPage from "./pages/sign-in";
import NavbarDefault from "./components/navbar";
import Footer from "./components/footer";
import DetailsPage from "./components/detailsPage";
import Cart from "./components/cart";

function App() {
  return (
    <BrowserRouter>
    <div className="flex flex-col h-screen">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavbarDefault />
              <Footer />
            </>
          }
        >
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="sign-in" element={<SignInPage />}/>
          <Route path=":id/details" element={<DetailsPage />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
