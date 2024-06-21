import crypto from "crypto";

export async function encryptSHA256(
  data: string,
  secretKey: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const hash = crypto.createHmac("sha256", secretKey);
      hash.update(data);
      const encryptedData = hash.digest("hex");
      resolve(encryptedData);
    } catch (error) {
      reject(error);
    }
  });
}
