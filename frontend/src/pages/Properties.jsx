import React, { useEffect, useState, useMemo } from "react";
import { CiSearch, CiFilter } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import swimmingPoolHouse from "../assets/swimmingPoolHouse.jpg";
import Pagination from "../components/Properties/Pagination";
import RoundedDiv from "./RoundedDiv";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../utils/api";
import { propertyStart, propertySuccess } from "../redux/slice";

const Properties = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { propertyInfo } = useSelector((state) => state.property);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const properties = propertyInfo || [];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterClick = (filterTitle, value) => {
    const filterKey = `${filterTitle}-${value}`;
    setSelectedFilters(
      (prevSelected) =>
        prevSelected.includes(filterKey)
          ? prevSelected.filter((f) => f !== filterKey) // remove if already selected
          : [...prevSelected, filterKey] // add if not selected
    );
  };

  const itemsPerPage = 15;

  const filters = [
    {
      title: "Types of Property",
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

  // Fetch properties
  const getProperties = async () => {
    try {
      dispatch(propertyStart());
      const response = await api.get("/api/property");
      dispatch(propertySuccess(response.data.properties));
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  // Filter & search logic
  const filteredProperties = useMemo(() => {
    if (!Array.isArray(properties)) return [];

    let result = properties;

    // Apply search filter first
    if (searchQuery) {
      result = result.filter((p) =>
        p.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply selected filters
    if (selectedFilters.length > 0) {
      result = result.filter((p) => {
        return selectedFilters.every((filterKey) => {
          const [filterTitle, value] = filterKey.split("-");
          if (filterTitle === "No. of Bedrooms") {
            return String(p.bedrooms) === value;
          }
          if (filterTitle === "No. of Bathrooms") {
            return String(p.bathrooms) === value;
          }
          if (filterTitle === "Types of Property") {
            return p.type === value;
          }
          if (filterTitle === "Construction Status") {
            return p.status === value;
          }
          return true;
        });
      });
    }

    return result;
  }, [properties, searchQuery, selectedFilters]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProperties.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div
      onClick={() => setShowFilter(false)}
      className={` relative mt-16 flex flex-col md:flex-row w-full`}
    >
      {/* Bottom filter/add bar for mobile */}
      <div className="md:hidden w-60 fixed bottom-2 left-1/2 -translate-x-1/2 flex justify-between items-center gap-1 bg-white rounded-full shadow px-8 py-2 z-20">
        <div
          onClick={(e) => {
            e.stopPropagation();
            setShowFilter(true);
          }}
          className="flex flex-col justify-center items-center gap-1"
        >
          <CiFilter className="text-gray-700" />
          <p className="text-gray-800 text-sm">Filters</p>
        </div>
        <div
          onClick={() => navigate("/properties/add-property")}
          className="flex flex-col justify-center items-center gap-1"
        >
          <IoIosAddCircleOutline className="text-gray-700" />
          <p className="text-gray-800 text-sm">Add Property</p>
        </div>
      </div>

      {/* Sidebar filter (desktop) */}
      <div className="hidden md:block w-full md:w-100 md:border-r border-gray-200 sticky md:top-10 bg-white md:bg-gray-50 py-6 md:py-10 px-4 md:px-6 overflow-y-auto shadow-none md:shadow-inner">
        {userInfo && (
          <button
            onClick={() => navigate("/properties/add-property")}
            className="py-2 text-center w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white rounded-xl mb-6 text-sm md:text-base font-medium"
          >
            + Add Property
          </button>
        )}

        {/* Search */}
        <div className="flex justify-between items-center border rounded-xl h-10 py-1 px-3 bg-gray-100">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="bg-transparent outline-none text-sm md:text-base text-gray-900 placeholder-gray-600 w-full"
          />
          <CiSearch size={22} className="text-gray-500" />
        </div>

        {/* Filters */}
        {filters.map((filter) => (
          <div className="mt-6 md:mt-8" key={filter.title}>
            <h2 className="font-semibold text-gray-800 text-base">
              {filter.title}
            </h2>
            <div className="flex gap-2 flex-wrap mt-3">
              {filter.list.map((e) => (
                <RoundedDiv
                  key={`${filter.title}-${e}`}
                  onClick={() => handleFilterClick(filter.title, e)}
                  isSelected={selectedFilters.includes(`${filter.title}-${e}`)}
                >
                  {e} {filter.title === "No. of Bedrooms" ? " BHK" : ""}
                </RoundedDiv>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile filter drawer */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-30 flex justify-center items-end md:hidden transition-transform duration-300 ${
          showFilter ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={() => setShowFilter(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto p-6"
        >
          {/* Filters in drawer */}
          {filters.map((filter) => (
            <div className="mt-6 md:mt-8" key={filter.title}>
              <h2 className="font-semibold text-gray-800 text-base">
                {filter.title}
              </h2>
              <div className="flex gap-2 flex-wrap mt-3">
                {filter.list.map((e) => {
                  const filterKey = `${filter.title}-${e}`;
                  const isSelected = selectedFilters.includes(filterKey);
                  return (
                    <RoundedDiv
                      key={filterKey}
                      onClick={() => handleFilterClick(filter.title, e)}
                      isSelected={isSelected}
                    >
                      {e} {filter.title === "No. of Bedrooms" ? " BHK" : ""}
                    </RoundedDiv>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Property cards */}
      <div className="w-full p-4 sm:p-6 lg:p-10 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.length > 0 ? (
            currentItems.map((e) => (
              <div key={e._id} className="flex">
                <div
                  onClick={() =>
                    navigate(
                      `/properties/${e._id}/${e.title
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`
                    )
                  }
                  className="bg-white rounded-2xl shadow hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col cursor-pointer w-full"
                >
                  <img
                    src={e.images?.[0] || swimmingPoolHouse}
                    alt={e.title}
                    className="h-48 sm:h-52 md:h-56 object-cover w-full"
                  />
                  <div className="p-4 space-y-1">
                    <p className="text-lg font-semibold text-gray-900">
                      ₹{e.price?.toLocaleString() ?? "N/A"}
                    </p>
                    <h2 className="text-base font-medium text-blue-800 line-clamp-1">
                      {e.title}
                    </h2>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {e.description || "No description available"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No properties found.</p>
          )}
        </div>

        {/* Pagination */}
        {filteredProperties.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalItems={filteredProperties.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </div>
  );
};

export default Properties;
