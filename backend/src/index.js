import connectDb from "./databases/connectDb.js";
import dotenv from "dotenv";
import colors from "colors";
import { app } from "./app.js";

dotenv.config();
connectDb();
const PORT = process.env.PORT || 9120;

/**
 * @description base route (home)
 * @method GET
 * @route /
 */
app.get("/", (req, res) => {
    res.send("Welcome to Flashplus");
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`.underline.blue));
