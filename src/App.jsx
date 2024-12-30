/* eslint-disable react/prop-types */
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import NavBar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Loader from "./components/loader/Loader";

// Public Pages
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import GivePage from "./pages/GivePage";
import ConnectPage from "./pages/ConnectPage";
import Locations from "./components/our-locations/OurLocationsContent";
import CalgaryPage from "./components/our-locations/calgary/page";
import TorontoPage from "./components/our-locations/toronto/page";
import VancouverPage from "./components/our-locations/vancouver/page";
import YouTubePage from "./pages/YouTubePage";

// Admin Pages and Layout
import AdminLoginForm from "./components/admin-login/AdminLogin";
import AdminLayout from "./components/admin/Layout"; // New Admin Layout
import AdminOverview from "./pages/admin/AdminOverviewPage";

// Protected Route Component
import ProtectedRoute from "../ProtectedRoute";
import ConnectFormPage from "./pages/admin/submissions/ConnectFormPage";
import ContactFormPage from "./pages/admin/submissions/ContactFormPage";
import EventFormPage from "./pages/admin/uploads/EventFormPage";
import GroupFormPage from "./pages/admin/submissions/GroupFormPage";
import NewsletterPage from "./pages/admin/submissions/NewsletterPage";
import VolunteersPage from "./pages/admin/submissions/VolunteersPage";
import VolunteerForm from "./components/volunteer-form/VolunteerForm";
import ContactForm from "./components/contact-form/ContactForm";
// import EventUploadPage from "./pages/admin/uploads/EventUploadsView";
import EventsPage from "./pages/EventsPage";
// import MainEventsPageUpload from "./pages/admin/uploads/MainEventsPage";
// import MainEventsDisplay from "./pages/admin/uploads/MainEventsDisplay";
// import EventUpload from "./pages/admin/uploads/EventUploadsView";
import EventUploadPage from "./pages/admin/uploads/EventUploadsView";
import SC24Page from "./pages/SC24Page";

const AppWrapper = () => {
  const location = useLocation();
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    const loaderTimeline = gsap.timeline({
      onComplete: () => setIsContentVisible(true),
    });

    setIsContentVisible(false);

    loaderTimeline
      .set(".loader", { display: "block" })
      .set(".loader__element", { transformOrigin: "center right" })
      .to(".loader__element", { scaleX: 1, ease: "expo.inOut", stagger: 0.1, duration: 0.6 })
      .set(".loader__element", { transformOrigin: "center left" })
      .to(".loader__element", { scaleX: 0, ease: "expo.inOut", stagger: -0.1, duration: 0.6 })
      .set(".loader", { display: "none" });

    loaderTimeline.play(0);
  }, [location.pathname]);

  return (
    <div className={isContentVisible ? "opacity-100 transition-opacity duration-500" : "opacity-0"}>
      {/* Render Navbar and Footer only for public routes */}
      {location.pathname.startsWith("/admin") ? null : <NavBar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/connect" element={<ConnectPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/service-recap" element={<YouTubePage />} />
        <Route path="/give" element={<GivePage />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/supernatural-canada" element={<SC24Page />} />
        <Route path="/locations/calgary" element={<CalgaryPage />} />
        <Route path="/locations/toronto" element={<TorontoPage />} />
        <Route path="/locations/vancouver" element={<VancouverPage />} />
        <Route path="/volunteer-form" element={<VolunteerForm />} />
        <Route path="/contact-form" element={<ContactForm />} />
        <Route path="/admin-login" element={<AdminLoginForm />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Routes>
                  <Route path="" element={<AdminOverview />} />
                  {/* <Route path="" element={<AdminOverview />} />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           */}
                  <Route path="submissions/connect-form" element={<ConnectFormPage />} />
                  <Route path="submissions/contact-form" element={<ContactFormPage />} />
                  <Route path="submissions/group-form" element={<GroupFormPage />} />
                  <Route path="submissions/newsletter" element={<NewsletterPage />} />
                  <Route path="submissions/volunteers" element={<VolunteersPage />} />
                  <Route path="submissions/worship-form" element={<VolunteersPage />} />
                  <Route path="uploads/events-upload" element={<EventFormPage />} />
                  <Route path="uploads/events-display" element={<EventUploadPage />} />
                  {/* <Route path="uploads/main-events-upload" element={<MainEventsPageUpload />} />
                  <Route path="uploads/main-events-display" element={<MainEventsDisplay />} /> */}
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
      {location.pathname.startsWith("/admin") ? null : <Footer />}
    </div>  
  );
};

export default function App() {
  return (
    <Router>
      <Loader />
      <AppWrapper />
    </Router>
  );
}
