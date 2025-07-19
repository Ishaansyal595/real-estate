import React, { useEffect, useReducer, useState } from "react";
import FileInput from "../components/FileInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import { propertyStart, propertySuccess, propertyFail } from "../redux/slice";
import toast from "react-hot-toast";

const EditProperty = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, userInfo, propertyInfo } = useSelector(
    (state) => state.user
  );

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

  const { propertyId, propertyTitle } = useParams();

  const fetchPropertyInfo = async () => {
    try {
      const res = await api.get(`/api/property/${propertyId}/${propertyTitle}`);

      return setPropertyData(res.data.properties);
    } catch (error) {
      console.error("Error fetching property:", error);
    }
  };

  useEffect(() => {
    fetchPropertyInfo();
  }, [propertyId, propertyTitle]);

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
    setPropertyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // For Edit Property
  const editPropertyHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", propertyData.title);
      formData.append("description", propertyData.description);
      formData.append("price", propertyData.price);
      formData.append("address", propertyData.address);
      formData.append("city", propertyData.city);
      formData.append("state", propertyData.state);
      formData.append("pincode", propertyData.pincode);
      formData.append("propertyType", propertyData.propertyType);
      formData.append("bedrooms", propertyData.bedrooms);
      formData.append("bathrooms", propertyData.bathrooms);
      formData.append("constructionStatus", propertyData.constructionStatus);
      formData.append("area", propertyData.area);

      // Append each selected image
      propertyData.images.forEach((file) => {
        formData.append("images", file);
      });

      const res = await api.put(
        `/api/property/${propertyData._id}/${propertyData.title}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Property updated successfully!");
      navigate(`/properties/${propertyData._id}/${propertyData.title}`);
    } catch (error) {
      console.error("Edit property error:", error);
      toast.error("Failed to update property.");
    }
  };

  const deletePropertyHandler = async () => {
    if (!window.confirm("Are you sure you want to delete this property?")) {
      return;
    }

    try {
      const res = await api.delete(
        `/api/property/${propertyData._id}/${propertyData.title}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      toast.success("Property deleted successfully!");
      navigate("/properties"); // or wherever you list properties
    } catch (error) {
      console.error("Delete property error:", error);
      toast.error("Failed to delete property.");
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center p-6 py-25">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Edit Your Property
        </h2>
        {/* <p className="text-center text-gray-600">
          We'd love to hear from you! Please fill out the form below and we'll
          get back to you soon.
        </p> */}

        <form className="space-y-8" onSubmit={editPropertyHandler}>
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

          <div className="flex justify-between items-center gap-20 mt-10">
            <button
              type="submit"
              className="w-full bg-orange-400 text-white py-2 rounded hover:bg-orange-500 transition duration-200"
            >
              Edit Property
            </button>

            <button
              type="button"
              onClick={deletePropertyHandler}
              className="w-full bg-red-700 text-white py-2 rounded hover:bg-red-500 transition duration-200"
            >
              Delete Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProperty;
