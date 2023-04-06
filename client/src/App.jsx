import "../src/dist/styles.css";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Models from "./Pages/Models";
import TestimonialsPage from "./Pages/TestimonialsPage";
import Team from "./Pages/Team";
import Contact from "./Pages/Contact";
import "./index.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PageNotFound from "./Pages/NotFound";
import AdminDashboard from "./Pages/AdminDashboard";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="book" element={<Models />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="team" element={<Team />} />
        <Route path="contact" element={<Contact />} />
        <Route path="signup" element={<Signup />} />
        {user && user.role === "admin" && <Route path="admin" element={<AdminDashboard />} />}
        <Route path="login" element={<Login />} />
        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
