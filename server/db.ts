// Database connection using Neon serverless PostgreSQL
// Following javascript_database blueprint
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configure WebSocket with TLS disabled for development self-signed certificates
class CustomWebSocket extends ws {
  constructor(address: string, protocols?: string | string[]) {
    super(address, protocols, {
      rejectUnauthorized: false
    });
  }
}

neonConfig.webSocketConstructor = CustomWebSocket as any;
neonConfig.useSecureWebSocket = true;
neonConfig.pipelineConnect = false;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema });
