import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    jwt: { secret: process.env.SECRET },
};
