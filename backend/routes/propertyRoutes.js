import express from "express";
import parser from "../utils/multer.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addProperty,
  getProperty,
  updateProperty,
  deleteProperty,
  getSingleProperty,
  getUserProperty,
  // addToFavourite,
  // deleteFavourite,
} from "../controllers/propertyController.js";

const PropertyRouter = express.Router();

PropertyRouter.post(
  "/add-property",
  authMiddleware,
  parser.array("images"),
  addProperty
);

PropertyRouter.get("/", getProperty);

PropertyRouter.get("/my-properties", authMiddleware, getUserProperty);

PropertyRouter.get("/:propertyId/:propertyTitle", getSingleProperty);

// Update & delete routes
PropertyRouter.put(
  "/:propertyId/:propertyTitle",
  authMiddleware,
  parser.array("images"), // if you allow image updates
  updateProperty
);

PropertyRouter.delete(
  "/:propertyId/:propertyTitle",
  authMiddleware,
  deleteProperty
);

// PropertyRouter.post("/favourites/:propertyId", addToFavourite);
// PropertyRouter.delete("/favourites/:propertyId", deleteFavourite);

export default PropertyRouter;
