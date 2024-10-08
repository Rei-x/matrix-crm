import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import "dotenv/config";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    OPENAI_API_KEY: z.string(),
    MATRIX_BASE_URL: z.string().url(),
    MATRIX_USER_ID: z.string(),
    MATRIX_ACCESS_TOKEN: z.string(),
    TEMP_DIR: z.string().default("./temp"),
    TRANSCRIPTIONS_DIR: z.string().default("./transcriptions"),
    PORT: z.coerce.number().default(3000),
    TOPIC_NAME: z.string().default("rei-reminders"),
    API_URL: z.string().default("http://localhost:4000"),
    LIDL_PLUS_REFRESH_TOKEN: z.string(),
  },
  runtimeEnv: process.env,
  isServer:
    typeof window === "undefined" ||
    ("isServer" in window && window.isServer === true),
  emptyStringAsUndefined: true,
});
