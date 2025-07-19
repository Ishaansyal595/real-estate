import React, { useEffect } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiHomeHeartLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import api from "../utils/api";
import { propertyFail, propertyStart, propertySuccess } from "../redux/slice";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { propertyInfo } = useSelector((state) => state.property);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        dispatch(propertyStart());
        const { data } = await api.get("/api/property/my-properties", {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        dispatch(propertySuccess(data));
      } catch (error) {
        dispatch(propertyFail(error.response?.data?.message || error.message));
      }
    };

    if (userInfo) {
      fetchProperties();
    }
  }, [dispatch, userInfo]);

  // Format joined date nicely
  const joinedDate = userInfo?.createdAt
    ? new Date(userInfo.createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 via-white to-gray-50 py-20 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Avatar */}
          <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-blue-600 shadow-lg">
            <img
              src="https://i.pravatar.cc/150?img=3"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left space-y-2">
            <h2 className="text-3xl font-bold text-gray-800">
              {userInfo.name}
            </h2>
            <div className="flex items-center justify-center md:justify-start text-gray-600">
              <MdEmail className="mr-2 text-xl" />
              <span>{userInfo.email}</span>
            </div>
            <div className="text-gray-500 text-sm">Joined: {joinedDate}</div>
            <button className="mt-3 inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition">
              <FaUserEdit className="mr-2" /> Edit Profile
            </button>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Statistics & Properties */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Properties Card */}
          <div className="flex items-center p-5 bg-blue-50 rounded-2xl shadow">
            <RiHomeHeartLine className="text-4xl text-blue-600 mr-4" />
            <div>
              <div className="text-lg font-semibold">My Properties</div>
              <div className="text-gray-700 text-sm">
                Total: {propertyInfo?.count || 0}
              </div>
            </div>
          </div>

          {/* Add more cards if needed (e.g., saved listings, reviews) */}
          <div className="flex items-center p-5 bg-green-50 rounded-2xl shadow">
            <svg
              className="w-8 h-8 text-green-600 mr-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <div className="text-lg font-semibold">Verified Listings</div>
              <div className="text-gray-700 text-sm">0 (coming soon)</div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* List of User's Properties */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            My Properties
          </h3>
          {propertyInfo?.count > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {propertyInfo.properties.slice(0, 4).map((property) => (
                <div
                  key={property._id}
                  onClick={() =>
                    navigate(
                      `/properties/${property._id}/${property.title
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`
                    )
                  }
                  className="p-4 bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition"
                >
                  <div className="font-semibold text-gray-700 truncate">
                    {property.title}
                  </div>
                  <div className="text-gray-500 text-sm truncate">
                    {property.address}, {property.city}
                  </div>
                  <div className="text-blue-600 font-semibold mt-1">
                    ₹{property.price?.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500">No properties added yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
