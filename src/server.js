import express from "express";
import { configDotenv } from "dotenv";
import { connectDb, disconnectDb } from "./config/db.js";

// Import Routes
import movieRoutes from "./routes/movieRoutes.js"
import { disconnect } from "process";

configDotenv();
connectDb;

const app = express();

// API Routes
app.use("/movies", movieRoutes);

app.get("/hello", (req, res) => {
    res.json({message: "hello world main"})
});

const PORT = 5001;
const server = app.listen(PORT, () =>{
    console.log(`Server running on port - ${PORT}`);
});

// Handle unhandled promis rejections (e.g., database connection error)
process.on("unhandledRejection", (err)=>{
    console.error("Unhandled Rejection:", err);
    server.close(async()=>{
        await disconnectDb();
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err)=>{
    console.error("Uncaught Exception:", err);
    await disconnectDb();
    process.exit(1);
});

// Graceful shutdonw
process.on("SIGTERM", async ()=>{
    console.error("SIGTERM received, shutting down gracefully");
    server.close(async()=>{
        await disconnectDb();
        process.exit(0);
    });
});