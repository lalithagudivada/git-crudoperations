const express = require("express");
const mysql = require("mysql");
var bodyparser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
app = express();
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/images", express.static("images"));
app.use(cors());
const db = mysql.createPool({
  connectionLimit: "10",
  host: "localhost",
  user: "root",
  password: "",
  database: "project",
});

db.getConnection((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server connection is successful");
  }
});
app.get("/", (req, res) => {
  console.log("Server started");
  res.send("Home");
});

app.get("/report", (req, res) => {
  const sql = "select regno,stdname from sampledata";
  db.query(sql, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

app.post("/insert", (req, res) => {
  const regno = req.body.regno;
  const stdname = req.body.stdname;
//  console.log("reporting");
  const sql = "insert into sampledata(regno,stdname) values(?,?)";
  db.query(sql, [regno, stdname], (err, result) => {
    if (err) throw err;
    else {
      console.log(result);
      res.send("success");
      res.end();
    }
  });
});

app.post("/delete:regno", (req, res) => {
  const regno = req.params.regno;
  const sql = "delete from sampledata where sampledata.regno=?";
  db.query(sql, [regno], (err, result) => {
    if (err) throw err;
    else {
      res.send("deleted");
      res.end();
    }
  });
});

app.get("/display", (req, res) => {
  const sql = "Select * from sampledata";
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
    // else{
    res.send(data);
    //     console.log(data);
    // }
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage: storage });
// console.log("heloo");
app.post("/upload", upload.single("avatar"), (req, res) => {
  if (!req.file) {
    console.log("NO file uploaded");
  } else {
    console.log(req.file.filename);
    var imgsrc = "http://127.0.0.1:8080/images/" + req.file.filename;
    var updateimg = `UPDATE sampledata set image = ? where regno = '1258'`;
    db.query(updateimg, [imgsrc], (err, result) => {
      if (err) throw err;
      console.log("File uploaded");
    });
  }
});

app.post("/update", (req, res) => {
  const { regno, stdname } = req.body;
  const sql = "update sampledata set stdname=? where regno=?";
  db.query(sql, [stdname, regno], (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
      res.end();
    }
  });
});

app.listen(8080, () => {
  console.log("Server Listening");
});
