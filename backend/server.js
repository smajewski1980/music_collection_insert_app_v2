import app from "./index.js";
import { configDotenv } from "dotenv";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
