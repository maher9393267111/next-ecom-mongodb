const mongoose = require("mongoose");

const  ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
      minlength: [2, "Too short"],
      maxlength: [32, "Too long"],

      text: true,
      //   index: true,
    },

    price: { type: Number },
    tittle: { type: String, text: true },
    description: { type: String, text: true },

    category: { type: mongoose.Schema.ObjectId, ref: "Category" },


// array of colors with the color name and color image

mainImages:[

  {

    secure_url: { type: String },
    public_id: { type: String },
  }
]
,



    colors: [

        {
            name: { type: String, text: true },
            image: { type: String, text: true },
        }

    ],


  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
