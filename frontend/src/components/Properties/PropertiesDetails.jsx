import React, { useEffect, useState } from "react";
import swimmingPoolHouse from "../../assets/swimmingPoolHouse.jpg";
import PropertyMap from "./PropertyMap";
import { FaShower } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineBedroomParent } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import { useSelector } from "react-redux";

const PropertiesDetails = () => {
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { propertyId, propertyTitle } = useParams();

  const [property, setProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getPropertyDetail = async () => {
    try {
      const res = await api.get(`/api/property/${propertyId}/${propertyTitle}`);
      setProperty(res.data.properties);
    } catch (error) {
      console.error("Error fetching property details:", error);
    }
  };

  useEffect(() => {
    getPropertyDetail();
  }, []);

  if (!property) {
    return <p className="text-center mt-20">Loading property details...</p>;
  }

  return (
    <div className="mt-20 px-4 md:px-10 w-full flex flex-col gap-10">
      {/* Image Section */}
      <div className="w-full">
        {property.images && property.images.length > 0 ? (
          <>
            {/* Main Image */}
            <img
              src={property.images[0]}
              alt="main"
              className="w-full h-[35rem] rounded-xl object-cover"
            />

            {/* Thumbnails */}
            <div className="flex mt-2 gap-2">
              {property.images.slice(1, 4).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`thumb-${idx}`}
                  className="w-1/4 h-24 object-cover rounded cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                />
              ))}

              {property.images.length > 4 && (
                <div
                  className="relative w-1/4 h-24 bg-gray-200 rounded flex items-center justify-center cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                >
                  <span className="absolute text-xs font-semibold text-gray-700">
                    +{property.images.length - 4} more
                  </span>
                </div>
              )}
            </div>
          </>
        ) : (
          <img
            src={swimmingPoolHouse}
            alt="default"
            className="w-full h-[30rem] rounded-xl object-cover"
          />
        )}
      </div>

      {/* Details section */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start gap-7">
        <div className="w-full md:w-2/3 flex flex-col gap-7">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl text-blue-950 font-bold flex-1">
              {property.title}
            </h2>
            <p className="text-xl text-yellow-600 font-bold">
              ₹ {property.price}
            </p>
          </div>

          <div className="flex flex-wrap gap-5">
            <p className="flex font-medium gap-1 items-center">
              <FaShower className="text-blue-950" /> {property.bathrooms}{" "}
              Bathrooms
            </p>
            <p className="flex font-medium gap-1 items-center">
              <MdOutlineBedroomParent className="text-blue-950" />{" "}
              {property.bedrooms} Bedrooms
            </p>
            <p className="flex font-medium items-center gap-1">
              <FaCar className="text-blue-950" /> Parking
            </p>
          </div>

          <p className="text-gray-700">{property.description}</p>

          <p className="flex items-center gap-2 text-gray-700">
            <FaLocationDot /> {property.address}, {property.city},{" "}
            {property.pincode}, {property.state}
          </p>

          <button className="w-full text-center bg-blue-950 hover:bg-blue-900 py-2 rounded-lg text-white font-semibold">
            Book your visit
          </button>

          {(property.user === userInfo?._id || userInfo?.role === "admin") && (
            <button
              onClick={() =>
                navigate(
                  `/properties/${property._id}/${property.title
                    .replace(/\s+/g, "-")
                    .toLowerCase()}/edit-property`
                )
              }
              className="w-full text-center bg-blue-950 hover:bg-blue-900 py-2 rounded-lg text-white font-semibold"
            >
              Edit your Property
            </button>
          )}
        </div>

        {/* Map */}
        <div className="w-full md:w-1/2 z-0">
          <PropertyMap title={property.title} city={property.city} />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-100">
          <div className="bg-white p-4 rounded max-w-3xl w-full max-h-[80vh] overflow-auto">
            <button
              className="mb-2 text-red-500 font-semibold"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
            <div className="flex flex-col gap-2">
              {property.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`modal-${idx}`}
                  className="w-full h-50 object-cover rounded"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertiesDetails;
