import "./config/instrument.js";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/mongoDB.js";
import * as Sentry from "@sentry/node";
import clerkWebhooks from "./controllers/webhooks.js";
import companyRouter from "./routes/companyRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import jobRouter from './routes/jobRoutes.js'
//initilize express
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//db connection
await connectDb();
//cloudinary connection
await connectCloudinary();
//routes
app.get("/", (req, res) => {
  res.send("Api working");
});
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.post("/webhooks", clerkWebhooks);
app.use("/api/company", companyRouter);
app.use('/api/jobs',jobRouter)
//port
const port = process.env.PORT || 3000;

Sentry.setupExpressErrorHandler(app);

app.listen(port, () => {
  console.log(`Server is Running Successfully at port ${port}`);
});
