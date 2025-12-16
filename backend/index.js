import express from "express";
import recordRoutes from "./routes/recordRoutes.js";
import cdCompsRoutes from "./routes/cdCompsRoutes.js";
import cdSinglesRoutes from "./routes/cdSinglesRoutes.js";
import tapesRoutes from "./routes/tapesRoutes.js";
import cdsMainRoutes from "./routes/cdsMainRoutes.js";
import bodyParser from "body-parser";
const app = express();

app.use(bodyParser.json());
app.use("/records", recordRoutes);
app.use("/cd-comps", cdCompsRoutes);
app.use("/cd-singles", cdSinglesRoutes);
app.use("/tapes", tapesRoutes);
app.use("/cds-main", cdsMainRoutes);

app.get("/errortest", (req, res, next) => {
  return next(new Error());
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json("Something went wrong on our end, please try again.");
});

export default app;
