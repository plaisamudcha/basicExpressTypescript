import express from "express";
import "dotenv/config";
import { envconfig } from "@/config/env.config";
import { authRouter } from "@/routers/auth.router";
import { errorMiddleware } from "@/middleware/error.middleware";

// Should we declare type of app here?
// Answer: No, TypeScript can infer the type from express()
const app = express(); //app:Express

app.use("/auth", authRouter);

app.use(errorMiddleware);

const port = envconfig.PORT;
app.listen(port, () => console.log(`Server is running on port ${port}`));

// Router ===> Controller ===> Service ===> Repository (Data Access Layer)
