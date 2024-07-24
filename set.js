const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUUwY29HckNjbTEwME1yMEw1VjhKSFpIbVd0MzhxNHFtVi9NWWtnM2VGTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNWtZbXQrNkNxVm5Zc1FXa3huSkt3ckVVclBBVllvVDVkRlNxN2VjdmgzOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxTzBESzlDM0Q3RThQa2w0QTNPa09UcHl6OXhXSHJsdkRXSlNRcEppWUVZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1RHZNM3hwb1J6R29MYmJKUUtDZ3B3Tm91c1l5ekZJWlFuYm9VS3FGVkdZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRNZnM2ZGZFdmlHWlBlaDZlUjVlK0gyZVpEUmlROWdQRERYeG1aM0cxSEE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InkzeXZwMThrV09iU3V5TStqTXNsL090VWxkNk9FWGx1OXJJRTBTT0tyMDg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0lNcmlTSXM3N281QWlHWFQ2eDFqbEtvWUR2blZ1RlhzWGlmeDdvUTJYcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRGdGdUwvVkRVSzByRTRhWjlub1AyS0VjNDZ3NkNnSUxmNDVZS05TaGhEQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1tTXh4c3pZcGtTSUJzNVlqT01VaGZNb1BMOHUybVE4T3grdnJJT0s2S0xtSGRQOXhKNURsQzdRZG5qNkVkY0Fvcm5mRHNUVGR4K0prbWhHSkcyR0FnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjIyLCJhZHZTZWNyZXRLZXkiOiI4VzNsN3Zid29GOTc5dHdwNmNQTC9tWkxKOG1wanErYXNGK3Ftc0pPbDNRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ3T2Y0SkV2TFN1R3h5TkdfOV9LUjJBIiwicGhvbmVJZCI6IjdmOGUxMThkLWQ2MTQtNDQ0Yy1iOWJhLWViMDdmNTNhYzUyNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5aUs2d2JXQjhUU3ZLTjF3VVQzS2ZnUzA1V0k9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMWFPSGVCcnpsekszMjZEQnlxQWdqbkVML05RPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlEyNktRUjVKIiwibWUiOnsiaWQiOiIyMzQ4MTcxMTM5NjM3OjUwQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkNsYXNzaWMgR3V5In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOTERrMVlRNDhMN3RBWVlEU0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI4R2dKZUpYVTJtNzFmN0tLTXpXN3gwQU03MGoyZDJtYzRHaEhPLzQyaFhzPSIsImFjY291bnRTaWduYXR1cmUiOiJsM1hXQ2p5RjBQUjFBaE4wZWxSd3Z4TG4ralJNaHBrbHM0c1BjbkYvc0QvSzZ1MU9LQ1JnZCtVNlI1WElqOW5aU1JOU2o2MHJZc0VGYkJlei9BSlpEUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiRzhhb0FxTk1zdVpkRlBCWTdMRHNtbWs5YU5jb1VjNmdGcUpIQWlwV0NXY0JDRnJzQ0ZKdndpYlROUXVpbU1MbmVxMmN6N1IyRXNrVk8xckVzZ0kvRGc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTcxMTM5NjM3OjUwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZCb0NYaVYxTnB1OVgreWlqTTF1OGRBRE85STluZHBuT0JvUnp2K05vVjcifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjE2ODg0MzF9==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Classic Guy",
    NUMERO_OWNER : process.env.OWNER_NUM || "2348171139637",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
