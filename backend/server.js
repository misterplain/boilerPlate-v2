require("dotenv").config();
const express = require("express");
const path = require("path");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const colors = require("colors");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const { logEvents } = require("./middleware/logger");
const PORT = process.env.PORT || 3500;
//routes
const usersRoutes = require("./routes/usersRoutes");
const authRoutes = require("./routes/authRoutes");
const registerRoutes = require("./routes/registerRoutes");
const refreshRoutes = require("./routes/refreshRoutes");
const logoutRoutes = require("./routes/logoutRoutes");
const blogsRoutes = require("./routes/blogsRoutes");
const collabRoutes = require("./routes/collabRoutes");
const favoritesRoutes = require("./routes/favoritesRoutes");
const commentsRoutes = require("./routes/commentsRoutes");

const app = express();

console.log(process.env.NODE_ENV);

//Connect to Mongo DB
connectDB();

//custom middleware logger
app.use(logger);

//cross origin resource sharing
// app.use(cors(corsOptions));
app.use(cors("*"));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve status files
app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/register", registerRoutes);
app.use("/refresh", refreshRoutes);
app.use("/logout", logoutRoutes);
app.use("/blogs", blogsRoutes);
app.use("/collab", collabRoutes)
app.use("/favorites", favoritesRoutes);
app.use("/comments", commentsRoutes);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "/views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not found" });
  } else {
    res.type("txt").send("404 Not found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () =>
    console.log(
      `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
        .bold
    )
  );
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
