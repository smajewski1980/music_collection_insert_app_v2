import express from "express";
import recordRoutes from "./routes/recordRoutes.js";
import bodyParser from "body-parser";
const app = express();

app.use(bodyParser.json());
app.use("/records", recordRoutes);

app.get("/errortest", (req, res, next) => {
  return next(new Error());
});

app.use((err, req, res, next) => {
  // console.log(err.message);
  res
    .status(err.status || 500)
    .json("Something went wrong on our end, please try again.");
});

export default app;
