import { createClient } from "@vercel/kv";
require("dotenv/config");

const kvClient = createClient({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
  automaticDeserialization: false,
});

export { kvClient };
