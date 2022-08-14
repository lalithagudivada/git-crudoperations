// const express = require("express");
// const mysql = require("mysql");
// const multer = require("multer");
// const path = require("path");
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     console.log(file);
//     console.log("images/" + file.originalname);
//     cb(null, Date.now + path.extname(file.originalname));
//   },
// });
// app = express();
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 10000000 },
//   fileFilter: function (req, file, cb) {
//     var ext = path.extname(file.originalname);
//     if (ext != ".png" && ext != ".jpg" && ext != ".jpeg" && ext != ".gif") {
//       return cb("Error!!!");
//     }
//     cb(null, true);
//   },
// });
// app.get("/upload", (req, res) => {
//   res.render("upload");
// });
// app.post("/upload", upload.single("image"), (req, res) => {
//   if (!req.file) {
//     console.log("file not uploaded");
//   } else {
//     // res.send("image uploaded");
//     // console.log(req.file.filename);
//     // var url = "http://127.0.0.1:3001/images/" + req.file.filename;
//     // var db = "update student_details set image=(?) where stid = '1201'";
//     // db.query(db, [url], (err, result) => {
//     console.log("File uploaded to database");
//     // });
//   }
// });
// app.listen(8080, () => {
//   console.log("server is");
// });
// const express = require("express");
// const mysql = require("mysql");
// const multer = require("multer");
// const path = require("path");

// app.get("/upload",(req,res)=>{
//     res.render("upload");
// })
// app.post("/upload",upload.single("image"),(req,res)=>{
//     res.send("image uploaded");
// })
// const upload = multer({ storage: storage });
const express = require("express");
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    console.log("images/" + file.originalname);
    cb(null, Date.now + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
app = express();
app.get("/upload", (req, res) => {
  res.render("upload");
});
// app.post("/upload", upload.single("image"), (req, res) => {
//   res.send("image uploaded");
// });
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    console.log("No file upload");
  } else {
    console.log(req.file.filename);
    var imgsrc = "http://127.0.0.1:8080/images/" + req.file.filename;
    var insertData = "update  `sampledata` set `image`=? where `regdno`=1260";
    db.query(insertData, [imgsrc], (err, result) => {
      if (err) throw err;
      console.log("file uploaded");
    });
  }
});
app.listen(8080, () => {
  console.log("server is listening");
});
