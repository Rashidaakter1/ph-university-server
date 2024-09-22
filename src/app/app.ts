import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import router from "./routes";
const app: Application = express();

//parsers

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", router);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
