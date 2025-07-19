import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      // e.g. price in rupees or dollars
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    // country: {
    //   type: String,
    //   default: "India", // or your default country
    // },
    propertyType: {
      // e.g. Apartment, Villa, Plot
      type: String,
      required: true,
    },
    bedrooms: {
      type: Number,
      default: 0,
    },
    bathrooms: {
      type: Number,
      default: 0,
    },
    constructionStatus: {
      type: String,
      required: true,
    },
    area: {
      // e.g. 1200 sqft
      type: Number,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    user: {
      // Reference to the user/agent who added this
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isFeatured: {
      // Optional: mark as featured on homepage
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
); // adds createdAt & updatedAt

const Property = mongoose.model("Property", propertySchema);
export default Property;
