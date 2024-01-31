import mongoose from "mongoose";

const Page = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      uniquie: true,
    },
    content: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
    },
    userId: {
      type: String,
      required: true,
    },
    uuid: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Page", Page);
