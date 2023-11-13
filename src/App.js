import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/profile";
import Home from "./pages/home";
import LoginPage from "./pages/log-in";
import NavbarDefault from "./components/navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavbarDefault />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
