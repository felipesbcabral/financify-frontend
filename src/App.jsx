import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPassword from "./pages/ForgotPassword";
import AddChargePage from "./pages/NewValues"
import EditChargePage from "./pages/EditChargePage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/New" element={<AddChargePage />}/>
        <Route path="/Edit" element={<EditChargePage />}/>
      </Routes>
    </Router>
  );
}

export default App;

