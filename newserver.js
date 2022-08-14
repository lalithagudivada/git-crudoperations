// const express = require("express");
// const mysql = require("mysql");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// app = express();

// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "project",
// });
// db.getConnection((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("success");
//   }
// });
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// // app.get("/api/get", (req, res) => {
// //   const sqlselect = "select * from ecertificate";
// //   db.query(sqlselect, (err, result) => {
// //     res.send(result);
// //   });
// // });
// app.post("/insert", (req, res) => {
//   const regno = req.body.regno;
//   const stdname = req.body.stdname;
//   const sqlInsert = `insert into sampledata(regno,stdname) values(?,?) `;
//   db.query(sqlInsert, [regno, stdname], (err, result) => {
//     if (err) {
//       throw err;
//     } else {
//       res.send("success");
//       res.end();
//     }
//   });
// });
// app.listen(8080, () => {
//   console.log("listening");
// });

// const express = require("express");
// const mysql = require("mysql");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const db = mysql.createPool({
//   connectionLimit: 12,
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "project",
// });
// db.getConnection((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Success");
//   }
// });
// app = express();
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/display", (req, res) => {
//   console.log("server is started");
//   var sql = `select * from sampledata`;
//   db.query(sql, function (err, result, fields) {
//     if (err) throw err;
//     else {
//       // var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
//       // res.send(resultArray);
//       // res.end();
//       res.send(result);
//     }
//   });
// });
// app.post("/insert", (req, res) => {
//   const regno = req.body.regno;
//   const stdname = req.body.stdname;
//   console.log("reporting");
//   const sql = "insert into sampledata(regno,stdname) values(?,?)";
//   db.query(sql, [regno, stdname], (err, result) => {
//     if (err) throw err;
//     else {
//       console.log(result);
//       res.send("success");
//       res.end();
//     }
//   });
// });

// app.listen(8080, () => {
//   console.log("server is listening");
// });

const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
// const multer = require("multer");
const db = mysql.createPool({
  connectionLimit: 12,
  host: "localhost",
  user: "root",
  password: "",
  database: "project",
});
db.getConnection((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Success");
  }
});
app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
// const upload = multer({ storage: storage });
// app.get("/upload", (req, res) => {
//   res.render("upload");
// });
// app.post("/upload", upload.single("image"), (req, res) => {
//   res.send("image uploaded");
// });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     console.log(file);
//     console.log("images/" + file.originalname);
//     // cb(null, Date.now + Path.extname(file.originalname));
//     // cb(null, file.originalname);
//   },
// });
// const upload = multer({
//   storage: storage,
// });

// app.get("/upload", (req, res) => {
//   res.render("upload");
// });

// app.post("/upload", upload.single("image"), (res, req) => {
//   // if(!req.file){
//   //   console.log("no file");

//   // }
//   // else{
//   //   console.log(req.file.filename);
//   //   var imgsrc=""
//   // }

//   res.send("fghjk");
//   // res.end();
// });

app.get("/display", (req, res) => {
  console.log("reporting");
  db.query("select * from sampledata", (err, result) => {
    if (err) {
      console.log("error");
    } else {
      // var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
      // res.send(resultArray);
      // res.end();
      console.log("result");
      res.send(result);
      res.end();
    }
  });
});

app.post("/insert", (req, res) => {
  const regno = req.body.regno;
  const stdname = req.body.stdname;
  console.log("reporting");
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

//app.post("/delete", (req, res) => {

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

// to update the data in server
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
  console.log("server is listening");
});
