import fs from 'fs';

export function setupCredentials() {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    const tmpPath = '/tmp/gcp-sa-key.json';
    fs.writeFileSync(tmpPath, process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
    process.env.GOOGLE_APPLICATION_CREDENTIALS = tmpPath;
  }
}
