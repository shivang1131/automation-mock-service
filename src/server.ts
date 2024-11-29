import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes";
import jsonPath from "jsonpath";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api", routes);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  const data = {
    context: {
      location: {
        citu: "adsa",
      },
    },
  };

  console.log("js", jsonPath.query(data, "$.context.location.citu"));
  console.log(`Server running at ${PORT}`);
});
