import Property from "../models/propertySchema.js";
import User from "../models/userSchema.js";

export const addProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      address,
      city,
      state,
      pincode,
      propertyType,
      bedrooms,
      bathrooms,
      constructionStatus,
      area,
    } = req.body;

    const images =
      Array.isArray(req.files) && req.files.length > 0
        ? req.files.map((file) => file.path)
        : [];

    // Simple validation
    if (
      !title ||
      !description ||
      price == null ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !propertyType ||
      !constructionStatus ||
      bedrooms == null ||
      bathrooms == null ||
      area == null ||
      !images.length
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Get user ID from auth middleware
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }

    const property = await Property.create({
      title,
      description,
      price,
      address,
      city,
      state,
      pincode,
      propertyType,
      bedrooms,
      bathrooms,
      constructionStatus,
      area,
      images,
      user: userId,
    });

    return res.status(201).json({
      property,
      message: "Property added successfully!",
    });
  } catch (error) {
    console.error("Error adding property:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getProperty = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const properties = await Property.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "name");

    const total = await Property.countDocuments();

    return res.status(200).json({
      success: true,
      count: properties.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      properties,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getUserProperty = async (req, res) => {
  try {
    const userId = req.user?._id;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // ✅ Find all properties where user field matches userId
    const properties = await Property.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "name");

    const total = await Property.countDocuments({ user: userId });

    return res.status(200).json({
      success: true,
      count: properties.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      properties,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getSingleProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const properties = await Property.findOne({ _id: propertyId });

    return res.status(200).json({
      success: true,
      message: "Property Found!",
      properties,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// UPDATE PROPERTY
export const updateProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Check permission: owner or admin
    if (
      property.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Update fields
    property.title = req.body.title || property.title;
    property.description = req.body.description || property.description;
    property.price = req.body.price || property.price;
    property.address = req.body.address || property.address;
    property.city = req.body.city || property.city;
    property.state = req.body.state || property.state;
    property.pincode = req.body.pincode || property.pincode;
    property.propertyType = req.body.propertyType || property.propertyType;
    property.bedrooms = req.body.bedrooms || property.bedrooms;
    property.bathrooms = req.body.bathrooms || property.bathrooms;
    property.area = req.body.area || property.area;
    property.constructionStatus =
      req.body.constructionStatus || property.constructionStatus;

    if (req.files && req.files.length > 0) {
      property.images = req.files.map((file) => file.path);
    }

    await property.save();

    res
      .status(200)
      .json({ message: "Property updated successfully", property });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// export const addToFavourite = async (req, res) => {
//   try {
//     const userId = req.user?.id;
//     const { propertyId } = req.params;

//     const user = await User.findById(userId);

//     if (!user.favourites.includes(propertyId)) {
//       user.favourites.push(propertyId);
//       await user.save();
//     }

//     res.json({ favourites: user.favourites });
//   } catch (error) {
//     console.error("Error adding to favourite:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const deleteFavourite = async (req, res) => {
//   try {
//     const userId = req.user?.id;
//     const { propertyId } = req.params;

//     const user = await User.findById(userId);

//     user.favourites = user.favourites.filter(
//       (id) => id.toString() !== propertyId
//     );

//     await user.save();

//     res.json({ favourites: user.favourites });
//   } catch (error) {
//     console.error("Error adding to favourite:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// DELETE PROPERTY
export const deleteProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Check permission: owner or admin
    if (
      property.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    await property.deleteOne();

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
