const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let task = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the name of the task"],
      max: [50, "name should be less than 50 characters"],
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: [true, "Please provide the user for the task"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = task;
