import mongoose from "mongoose";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: "root",
  pass: "root",
} as any;

try {
  mongoose.connect(" mongodb://user:pwd@127.0.0.1:26016/", options);
} catch (error) {
  console.log(JSON.stringify(error));
}
