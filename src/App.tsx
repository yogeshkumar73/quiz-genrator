import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Quiz from "./pages/Quiz";
import Developer from "./pages/Developer";
import Sidebar from "./components/Sidebar";
export default function App() {
  return (
    <>
      <Navbar />
        
         <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/developer" element={<Developer/>} />
      </Routes>
    </>
  );
};