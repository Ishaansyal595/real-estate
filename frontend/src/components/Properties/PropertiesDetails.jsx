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
    <div className="mt-20 px-15 w-full flex flex-col gap-10">
      {/* Image */}
      <div className="w-full">
        <div>
          {property.images && property.images.length > 0 ? (
            property.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`property-${idx}`}
                className="w-full h-[30rem] rounded-xl object-cover"
              />
            ))
          ) : (
            <img
              src={swimmingPoolHouse}
              alt="default"
              className="w-full h-[30rem] rounded-xl object-cover"
            />
          )}
        </div>
      </div>

      {/* Details */}
      <div className="w-full flex justify-between items-center gap-7">
        <div className="w-full flex flex-col gap-7">
          <div className="w-full flex justify-between items-center ">
            <h2 className="text-3xl text-blue-950 flex flex-wrap w-140 font-bold ">
              {property.title}
            </h2>
            <p className="text-xl text-yellow-600 font-bold">
              ₹ {property.price}
            </p>
          </div>

          <div className="flex gap-5 w-full">
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

          <p>{property.description}</p>

          <p className="flex items-center gap-2">
            <FaLocationDot /> {property.address}, {property.city},{" "}
            {property.pincode}, {property.state}
          </p>

          <button className="w-full text-center bg-blue-950 hover:bg-blue-900 py-2 rounded-lg text-white font-semibold">
            Book your visit
          </button>

          {(property.user === userInfo?._id || userInfo?.role === "admin") && (
            <button
              onClick={() => {
                navigate(
                  `/properties/${property._id}/${property.title
                    .replace(/\s+/g, "-")
                    .toLowerCase()}/edit-property`
                );
              }}
              className="w-full text-center bg-blue-950 hover:bg-blue-900 py-2 rounded-lg text-white font-semibold"
            >
              Edit your Property
            </button>
          )}
        </div>

        {/* Map */}
        <div className="w-full">
          <PropertyMap title={property.title} city={property.city} />
        </div>
      </div>
    </div>
  );
};

export default PropertiesDetails;
