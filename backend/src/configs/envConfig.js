import dotenv from "dotenv";
dotenv.config();
const CONFIG = {};

CONFIG.ENV = process.env.NODE_ENV || "development";
CONFIG.PORT = process.env.APP_PORT || "6000";
CONFIG.DB_URL = process.env.DB_URL;
CONFIG.SMTP_HOST = process.env.SMTP_HOST;
CONFIG.SMTP_PORT = process.env.SMTP_PORT;
CONFIG.SMTP_AUTH = {
   user: process.env.SMTP_AUTH_USER,
   pass: process.env.SMTP_AUTH_PW,
};
CONFIG.EMPCODE_FORMAT = process.env.EMPCODE_FORMAT;

export default CONFIG;
