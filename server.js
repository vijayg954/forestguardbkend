import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import DbConnect from "./config/Db.js";

// import oneLinerRoutes from "./routes/oneLinerroutes.js";
import quizRoutes from "./routes/quizRoutes.js";

import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);

dotenv.config();
DbConnect();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Routes
// app.use("/api/v1/forestguard/oneliner", oneLinerRoutes);
app.get("/test", (req, res) => {
  res.send("Test route working");
});
// app.use("/api/v1/forestguard/quiz", quizRoutes);
app.use("/api/v1/forestguardhindi/quiz", quizRoutes);
app.use("/api/v1/forestguardscience/quiz", quizRoutes);
app.use("/api/v1/forestguardeng/quiz", quizRoutes);
app.use("/api/v1/forestguardmaths/quiz", quizRoutes);
app.use("/api/v1/forestguardmpgk/quiz", quizRoutes);
app.use("/api/v1/forestpractice/quiz", quizRoutes);

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
