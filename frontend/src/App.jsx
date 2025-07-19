import React from "react";
import LoginForm from "./components/LoginForm";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import ContactUs from "./pages/ContactUs";
import Footer from "./components/Footer";
import PropertiesDetails from "./components/Properties/PropertiesDetails";
import AddProperty from "./pages/AddProperty";
import EditProperty from "./pages/EditProperty";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/properties" element={<Properties />} />
        <Route
          path="/properties/:propertyId/:propertyTitle"
          element={<PropertiesDetails />}
        />
        <Route path="/properties/add-property" element={<AddProperty />} />
        <Route
          path="/properties/:propertyId/:propertyTitle/edit-property"
          element={<EditProperty />}
        />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>

      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
