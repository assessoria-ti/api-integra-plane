import { encryptSHA256 } from "./encryptSHA";
require("dotenv/config");

const APP_SECRET_KEY = process.env.APP_SECRET_KEY || "";
const APP_AUTH_KEY = process.env.APP_AUTH_KEY || "";

export async function ValidaToken(token: string) {
  const authKey = await encryptSHA256(token, APP_SECRET_KEY);
  const secret = await encryptSHA256(APP_AUTH_KEY, APP_SECRET_KEY);

  return authKey == secret;
}
