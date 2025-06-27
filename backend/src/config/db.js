import { neon } from "@neondatabase/serverless";
import "dotenv/config";
console.log("Database URL:", process.env.DATABASE_URL);
export const sql = neon(process.env.DATABASE_URL);
