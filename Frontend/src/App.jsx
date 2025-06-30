import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home/homePage";
import About from "./Components/About/aboutPage";
import Contact from "./Components/Contact/contactPage";
import TournamentPage from "./Components/Tournament/tournamentPage";
import Footer from "./Components/Footer";
import NotFound from "./Components/error/errorPage";
import ScrollToTop from "./ScrollToTop";
function App() {
  return (
    <>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tournaments" element={<TournamentPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
                <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  );
}
export default App;
