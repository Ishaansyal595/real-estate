import React, { useReducer, useState } from "react";
import FileInput from "../components/FileInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { propertyStart, propertySuccess, propertyFail } from "../redux/slice";
import toast from "react-hot-toast";

const AddProperty = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, userInfo } = useSelector((state) => state.user);

  const [propertyData, setPropertyData] = useState({
    title: "",
    description: "",
    price: null,
    address: "",
    city: "",
    state: "",
    pincode: "",
    propertyType: "",
    bedrooms: null,
    bathrooms: null,
    constructionStatus: "",
    area: null,
    images: [], // you can upload later
  });

  const filters = [
    {
      title: "Property Type",
      list: [
        "Residential Appartment",
        "Resdential Land",
        "Independent House/Villa",
        "Independent/Builder Floor",
        "Farm House",
        "1 RK/Studio Appartment",
      ],
    },
    { title: "No. of Bedrooms", list: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    { title: "No. of Bathrooms", list: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    {
      title: "Construction Status",
      list: ["Under Construction", "Ready To Move"],
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prev) => ({ ...prev, [name]: value }));
  };

  const addPropertyHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(propertyStart());

      const formData = new FormData();
      Object.entries(propertyData).forEach(([key, value]) => {
        if (key === "images" && Array.isArray(value)) {
          value.forEach((file) => formData.append("images", file));
        } else {
          formData.append(key, value);
        }
      });

      const res = await api.post("/api/property/add-property", formData, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      dispatch(propertySuccess());
      toast.success("Property added successfully!");
      navigate("/properties");
    } catch (error) {
      console.error("Add property error:", error);
      dispatch(propertyFail());
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center p-6 py-25">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Add Your Property
        </h2>
        {/* <p className="text-center text-gray-600">
          We'd love to hear from you! Please fill out the form below and we'll
          get back to you soon.
        </p> */}

        <form className="space-y-8" onSubmit={addPropertyHandler}>
          <div>
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={propertyData.title}
              onChange={handleChange}
              placeholder="Property Title"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700">Property Type</label>
              <select
                name="propertyType"
                value={propertyData.propertyType || ""}
                onChange={handleChange}
                className="mt-1 w-full px-1 py-2 border border-gray-300 text-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="">Select Property Type</option>
                {filters[0].list.map((type, idx) => (
                  <option key={idx} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700">No. of Bedrooms</label>
              <select
                name="bedrooms"
                value={propertyData.bedrooms || ""}
                onChange={handleChange}
                className="mt-1 w-full px-1 py-2 border border-gray-300 text-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="">Select No. of Bedrooms</option>
                {filters[1].list.map((num, idx) => (
                  <option key={idx} value={num}>
                    {num} bhk
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700">No. of Bathrooms</label>
              <select
                name="bathrooms"
                value={propertyData.bathrooms || ""}
                onChange={handleChange}
                className="mt-1 w-full px-1 py-2 border border-gray-300 text-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="">Select No. of Bathrooms</option>
                {filters[2].list.map((num, idx) => (
                  <option key={idx} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Construction Status</label>
              <select
                name="constructionStatus"
                value={propertyData.constructionStatus || ""}
                onChange={handleChange}
                className="mt-1 w-full px-1 py-2 border border-gray-300 text-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="">Select Construction Status</option>
                {filters[3].list.map((status, idx) => (
                  <option key={idx} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={propertyData.price || ""}
                onChange={handleChange}
                placeholder="Property Price"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700">Address</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                name="address"
                value={propertyData.address}
                onChange={handleChange}
                placeholder="Address"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="text"
                name="city"
                value={propertyData.city}
                onChange={handleChange}
                placeholder="City"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="text"
                name="state"
                value={propertyData.state}
                onChange={handleChange}
                placeholder="State"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="text"
                name="pincode"
                value={propertyData.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700">Area/sq.mt</label>
            <input
              type="text"
              name="area"
              value={propertyData.area || ""}
              onChange={handleChange}
              placeholder="Property Area"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              rows="4"
              value={propertyData.description}
              onChange={handleChange}
              placeholder="Property Description..."
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            ></textarea>
          </div>

          <FileInput
            onFilesSelected={(files) =>
              setPropertyData((prev) => ({ ...prev, images: files }))
            }
          />

          <button
            type="submit"
            className="w-full bg-orange-400 text-white py-2 rounded hover:bg-orange-500 transition duration-200"
          >
            Add Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
