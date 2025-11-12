import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import "./App.css";

function App() {
  return (
    <Router>
      <nav>
        <div className="nav-left">
          <Link to="/" className="brand">
            InternKaro
          </Link>
        </div>
        <div className="nav-right">
          <Link to="/">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/me">Profile</Link>
        </div>
      </nav>


      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/me" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
