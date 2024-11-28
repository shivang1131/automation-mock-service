import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api", routes);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
