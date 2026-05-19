import e from "express";
import dotenv from "dotenv";
import cors from "cors";
import { collectionName, connectDB } from "./config/db.js";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { token } from "morgan";
import cookiePaser from "cookie-parser"


dotenv.config();
const app = e();

// middleware
app.use(e.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookiePaser())

app.get("/", (req, res) => {
  res.send("backend working");
});
app.post("/add-task", async (req, res) => {
  let db = await connectDB();
  let collection = await db.collection(collectionName);
  const result = await collection.insertOne(req.body);
  res.send({
    success: true,
    message: "task added succussfully",
    result,
  });
});
app.get("/tasks",verifyJwttoken, async (req, res) => {
  let db = await connectDB();
  let collection = await db.collection(collectionName);
  const result = await collection.find(req.body).toArray();
  res.send({
    success: true,
    message: "Data get succussfully",
    result,
  });
});

function verifyJwttoken(req,res,next){
  console.log("verify jwt token ",req.cookies['token'])
  let token = req.cookies["token"];
  jwt.verify(token,"Googlecom",(err,decoded)=>{
    if(err){
      return res.send({
        msg:"invalid token",
        success:false
      })
    
    }
    console.log(decoded)

  })
  next()

}
app.get("/task/:id", async (req, res) => {
  let db = await connectDB();
  const id = req.params;
  // console.log(id)
  let collection = await db.collection(collectionName);
  const result = await collection.findOne({ _id: new ObjectId(id) });
  res.send({
    success: true,
    message: "Data fetched succussfully",
    result,
  });
});
app.delete("/delete/:id", async (req, res) => {
  let db = await connectDB();
  let id = req.params.id;
  let collection = await db.collection(collectionName);
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  res.send({
    success: true,
    message: "task delete succussfully",
    result,
  });
});
app.delete("/delete-all", async (req, res) => {
  let db = await connectDB();
  let ids = req.body;
  let Objects = ids.map((item) => new ObjectId(item));
  console.log(ids);
  let collection = await db.collection(collectionName);
  const result = await collection.deleteMany({ _id: { $in: Objects } });
  res.send({
    success: true,
    message: "task delete succussfully",
  });
});
app.post("/signup", async (req, res) => {
  const userData = req.body;
  if (userData.email && userData.password) {
    const db = await connectDB();
    const collection = await db.collection("users");
    const result = await collection.insertOne(userData);

    if (result) {
      jwt.sign(userData, "Googlecom", { expiresIn: "3d" }, (err, token) => {
        res.send({
          success: true,
          msg: "signup successfully",
          token,
        });
      });
    }
  } else {
    res.send({
      success: false,
      msg: "failed",
    });
  }
});
app.post("/login",async(req,res)=>{
  const userData = req.body;
  if (userData.email && userData.password) {
    const db = await connectDB();
    const collection = await db.collection("users");
    const result = await collection.findOne({email:userData.email,password:userData.password});

    if (result) {
      jwt.sign(userData, "Googlecom", { expiresIn: "3d" }, (err, token) => {
        res.send({
          success: true,
          msg: "login successfully",
          token,
        });
      });
    } else {
      res.send({
        success: false,
        msg: "user not found",
      });
    }
  } else {
    res.send({
      success: false,
      msg: "failed",
    });
  }

})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on  http://localhost:${PORT}`);
});
