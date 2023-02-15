const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: Number,
    },
    assign: {
      type: String,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "project",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("task", TaskSchema);
