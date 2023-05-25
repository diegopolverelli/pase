import dotenv from "dotenv";

const environments = ["development", "staging", "production"];
export const currentEnvironment = environments[0];

dotenv.config({
  override: true,
  path: `./src/.env.${currentEnvironment}`,
});

export const config = {
  port: process.env.PORT||3000,
  persistence: process.env.PERSISTENCE||'mongo',
  mongoUrl: process.env.MONGO_URL,
  secretKey: process.env.SECRET_KEY||'123',
  githubClientId: process.env.GITHUB_CLIENT_ID||'123',
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET||'123',
  githubCallbackUrl: process.env.GITHUB_CALLBACK_URL||'123',
  adminMail: process.env.ADMIN_MAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
  mailingUser: process.env.MAILING_USER||'diegopolverelli@gmail.com',
  mailingPassword: process.env.MAILING_PASSWORD||'jvncumjsxcxemwcl',
  mailingName: process.env.MAILING_NAME||'Diego Polverelli',
  mailingService: process.env.MAILING_SERVICE||'gmail',
  mailingPort: process.env.MAILING_PORT||587,
};
