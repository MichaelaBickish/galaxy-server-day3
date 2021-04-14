import GalaxySchema from "../models/Galaxy";
import StarSchema from "../models/Star";
import mongoose from "mongoose";

class DbContext {
  Galaxies = mongoose.model("Galaxy", GalaxySchema);
  Stars = mongoose.model("Star", StarSchema);
}

export const dbContext = new DbContext();
