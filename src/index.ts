import bodyParser = require("body-parser");
import session = require("client-sessions");
import ejs = require("ejs");
import express = require("express");
import mongoose = require("mongoose");
import path = require("path");
import { router as general } from "./routes/index";
import { router as shopify } from "./shopify/routes/index";
import { router as woocommerce } from "./woocommerce/routes/index";
/**
 * initial app config
 */
const app = express();
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/**
 * cookies set up with encryption
 */
app.use(session({
  cookieName: "session",
  secret: "7f3bc78eabe74bdca213aceb9cfcc1f4",
  duration: 60 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));
/**
 * html rendering - if needed (For shopify react app is served by sending the index.html file.
 * Can be useful for a general view of Tracified ecommerce and other plugins)
 */
app.set("views", __dirname + "/views");
app.engine("html", ejs.renderFile);
/**
 * db connection
 * -set up default mongoose connection
 */
const mongoDB = "mongodb://shopify:Tracified@ds251435.mlab.com:51435/shopify-db";
mongoose.connect(mongoDB, {
  useMongoClient: true,
});
/**
 * -get the default connection
 */
const db = mongoose.connection;
/**
 * -bind connection to error event (to get notification of connection errors)
 */
db.on("error", console.error.bind(console, "MongoDB connection error:"));
/**
 * routes and static files
 * -general routes
 */
app.use("/", general);
/**
 * -shopify routes and static files(JS, CSS) for UI
 */
app.use("/shopify", shopify);
app.use(express.static(path.resolve(__dirname, "./shopify/react-app/build")));
/**
 * -woocommerce routes -(sample routes)
 */
app.use("/woocommerce", woocommerce);
/**
 * -404 route
 */
app.get("*", (req: express.Request, res: express.Response) => {
  return res.status(404).send("404 - Oops! Tracified-Ecommerce could not find that page" );
});

app.listen(app.get("port"), () => {
  console.log("Example app listening on port " + app.get("port") + "!");
});
