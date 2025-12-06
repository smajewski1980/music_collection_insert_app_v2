import express from "express";
const app = express();

app.get("/errortest", (req, res, next) => {
  return next(new Error());
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json("Something went wrong on our end, please try again.");
});

export default app;
