import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ForgotPassword from "./components/ForgotPassword";
import NewValues from "./components/NewValues"
import EditValues from "./components/EditValues";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/New" element={<NewValues />}/>
        <Route path="/Edit" element={<EditValues />}/>
      </Routes>
    </Router>
  );
}

export default App;

