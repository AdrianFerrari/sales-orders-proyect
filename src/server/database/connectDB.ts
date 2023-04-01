import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

//PGHOST_LOCAL is for running the app with npm run dev from outside the container and connect to the postgres db inside the container for debuggin
//PGHOST_PROD is for the app when running inside the same container as the postgres image
const host = process.env.NODE_ENV === "production" ? process.env.PGHOST : process.env.PGHOST_LOCAL;
const port = process.env.NODE_ENV === "production" ? process.env.PGPORT : process.env.PGPORT_LOCAL;

export const pool = new Pool({
  host: host,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: parseInt(port!),
});
