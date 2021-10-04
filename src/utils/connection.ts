import mongoose from "mongoose";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: "cryptogol",
  pass: "Gepo1991??",
} as any;

try {
  // mongodb://user:pwd@127.0.0.1:26016/
  const connectionString =
    "mongodb+srv://cryptogol:pwd@cluster0.lqbzv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  mongoose.connect(connectionString, options);
} catch (error) {
  console.log(JSON.stringify(error));
}
