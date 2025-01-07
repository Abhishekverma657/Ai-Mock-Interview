import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  dbCredentials:{
    url:'postgresql://neondb_owner:T8MW3idherEz@ep-lucky-band-a58oh60g.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require'
  }
 
});
