import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/profile";
import Home from "./pages/home";
import SignUpPage from "./pages/sign-up";
import SignInPage from "./pages/sign-in";
import NavbarDefault from "./components/navbar";
import Footer from "./components/footer";

function App() {
  return (
    <BrowserRouter>
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
          <Route path="sign-in" element={<SignInPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
