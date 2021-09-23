let { join } = require("path");

const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const flash = require("connect-flash");
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");

const main_route = require("./routes/main/main_router");
const admin_route = require("./routes/admin/admin_router");
const payment_route = require("./routes/payment/payment");

// intialization of the system
const app = express();
const prisma = new PrismaClient();

// configurations
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

dotenv.config({
  debug: true,
  encoding: "UTF-8",
});

// sesssions
app.use(
  expressSession({
    secret: `${process.env.SESSION_KEY}`,
    name: "sid",
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

// flash messages
app.use(flash());

// configurations of the static folders
app.use(express.static(join(__dirname, "public")));
app.use(express.static(join(__dirname, "uploads")));

// configurations of the express handlebars
const hbs = exphbs.create({
  extname: ".hbs",
  defaultLayout: join(__dirname, "views", "layouts", "main.hbs"),
  layoutsDir: join(__dirname, "views", "layouts"),
  partialsDir: join(__dirname, "views", "partials"),
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

if (process.env.NODE_ENV === "production") {
  app.enable("view cache");
}

// routes list
app.use(main_route);
app.use("/admin", admin_route);
app.use("/payments", payment_route);

const PORT = process.env.PORT;

//app.setMaxListeners(40);
app.listen(PORT, (error) => {
  if (error) {
    return console.log("there is an error on the port " + PORT);
  }
  return console.log(`server is working on appropriate port, ${PORT}`);
});
