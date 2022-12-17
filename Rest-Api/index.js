const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoute = require("./routes/auth")
const usersRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const multer = require("multer");
const path = require("path")

dotenv.config();

mongoose.connect(process.env.MONGO_URL,
  { useNewUrlParser: true }, () => {
  console.log("Database Connected");
});
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
  try {
    return res.status(200).json("File Uploaded")
  } catch (error) {
    res.status(500).json(error)
  }
})

app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/posts", postRoute)

app.listen(8800, () => {
  console.log("Server is running on port 8800");
});
