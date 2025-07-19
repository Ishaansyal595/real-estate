import React from "react";
import PropertyMap from "../components/Properties/PropertyMap";

const ContactUs = () => {
  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center p-6 py-25">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Contact Us
        </h2>
        <p className="text-center text-gray-600">
          We'd love to hear from you! Please fill out the form below and we'll
          get back to you soon.
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-gray-700">Message</label>
            <textarea
              rows="4"
              placeholder="Your message..."
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-400 text-white py-2 rounded hover:bg-orange-500 transition duration-200"
          >
            Send Message
          </button>
        </form>

        <div className="border-t pt-4 text-center text-gray-600 text-sm">
          📍 123 Luxury Street, Your City, India <br />
          📞 +91 98765 43210 | ✉️ info@luxuryhomes.com
        </div>
      </div>

      {/* Optional: Google Map */}
      <div className="mt-8 w-full max-w-3xl h-72">
        <PropertyMap />
      </div>
    </div>
  );
};

export default ContactUs;
