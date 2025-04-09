import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';
import { connect } from 'node:http2';
dotenv.config();


export default defineConfig({
    
  out: './drizzle',
  schema: './shared/shared-schima.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url:"postgresql://corporate_owner:DZq9zGecmpd5@ep-jolly-leaf-a5s2adkv-pooler.us-east-2.aws.neon.tech/finance%20?sslmode=require"!,
  },
});
