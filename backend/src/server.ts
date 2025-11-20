import express from "express";
import cors from "cors";
import helmet from "helmet";
import githubRoutes from "./routes/githubRoutes";
import { errorHandler } from "./middleware/errorHandler";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
}; //BigInt Serializing

const app = express();
const swaggerDocument = YAML.load("./src/openapi.yaml");
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (_req, res) => {
  res.send("Fithub Backend Server is currently running.");
});

app.get("/health", (_req, res) => {
  res.json({ 
    status: "ok",
   });
});

app.use("/api/github", githubRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`backend server is running on port ${PORT}`);
});

console.log("current database url=",process.env.DATABASE_URL);
