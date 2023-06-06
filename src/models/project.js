const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectShema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    dateOfStart: {
      type: String,
    },
    teamSize: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("project", ProjectShema);
