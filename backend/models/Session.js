const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the user schema
const sessionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  participants: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
