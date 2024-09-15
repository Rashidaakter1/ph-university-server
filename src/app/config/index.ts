import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  database__url: process.env.DATABASE__URL,
  default__password: process.env.DEFAULT__PASSWORD,
  bcrypt__saltRound: process.env.BCRYPT__SALTROUND,
  NODE_ENV: process.env.NODE_ENV,
  jwt__access__token: process.env.JWT__ACCESS__TOKEN,
  jwt__access__expires__in: process.env.JWT__ACCESS__EXPIRERS__IN,
  jwt__refresh__token: process.env.JWT__REFRESH__TOKEN,
  jwt__refresh__expires__in: process.env.JWT__REFRESH__EXPIRERS__IN,
  reset__ui__link: process.env.RESET__UI__LINK,
};
