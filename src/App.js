import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/profile";
import Home from "./pages/home";
import LoginPage from "./pages/log-in";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
