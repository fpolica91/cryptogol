import mongoose from "mongoose";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any;

try {
  mongoose.connect("mongodb://localhost", options);
} catch (error) {
  console.log(JSON.stringify(error));
}
