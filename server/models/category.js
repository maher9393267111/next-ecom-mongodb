const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
      minlength: [2, "Too short"],
      maxlength: [32, "Too long"],
    },

image:{

secure_url:String,
public_id:String


}

  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
