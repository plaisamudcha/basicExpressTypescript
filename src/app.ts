import express from "express";
import "dotenv/config";
import { envconfig } from "./config/env.config";

// Should we declare type of app here?
// Answer: No, TypeScript can infer the type from express()
const app = express(); //app:Express

// app.use();

const port = envconfig.PORT;
console.log(port);
