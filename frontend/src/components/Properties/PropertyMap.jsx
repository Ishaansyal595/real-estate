import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const PropertyMap = () => {
  const property = {
    id: 1,
    title: "Luxury Villa",
    position: [28.6139, 77.209],
  };

  return (
    <div className="w-full h-85">
      {" "}
      {/* full screen height */}
      <MapContainer
        center={property.position}
        zoom={15} // closer zoom to focus only on property
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false} // optional: disable scroll zoom if you prefer
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={property.position}>
          <Popup>{property.title}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
