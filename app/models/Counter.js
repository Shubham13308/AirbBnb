import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 100 },
});

export default mongoose.models.Counter || mongoose.model("Counter", CounterSchema);
