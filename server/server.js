
import express from "express";
import mongoose from "mongoose";
import apiRoute from "./routes/api.route.js";
import { userRoute } from "./routes/users.route.js";
import { postRoute } from "./routes/posts.route.js";
import { commentRoute } from "./routes/comments.route.js";
import {config} from "dotenv";
import cors from "cors";
import User from "./models/user.model.js";

config();
mongoose.connect(process.env.URL)
  .then(()=>{
    console.log("Connected to MongoDB");
  })
  .catch(()=>{
    console.log("Couldn't connect to MongoDB");
})

const app = express();
const port = 3000

app.use(cors());  
app.use(express.json());
app.use("/", apiRoute);
app.use("/", userRoute);
app.use("/", postRoute);
app.use("/", commentRoute);


app.get("/", async (req, res, next) => {

});

app.listen(3000, () => {console.log("server listening to port 3000")});
