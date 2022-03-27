/**
 * @file Implements mongoose model to CRUD
 * documents in the likes collection
 */
import mongoose from "mongoose";
import DislikeSchema from "./DislikeSchema";
const DislikeModel = mongoose.model("LikeModel", DislikeSchema);
export default DislikeModel;