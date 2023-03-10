//1st part start
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url"; //set the path when we configure directry

//step 3 creating route

import authRoutes from "./routes/auth.js";
//step 2 imports

import userRoutes from "./routes/users.js";
import {register} from "./controllers/auth.js";

//configuration

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//invoke

dotenv.config(); 
const app = express(); 
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb" , extended : true}));
app.use(bodyParser.urlencoded({ limit: "30mb" , extended : true}));
app.use(cors());

//set the dir where we keep img storage

app.use("/assets", express.static(path.join(__dirname,'public/assets'))); 

//file storage   

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null , "public/assets")
    },
    filename: function(req,file,cb){
        cb(null,file.originalname);
    }
});
//use upload to upload

const upload = multer({ storage });

//after setting up DB 
//step 2 Routes with files

app.post("/auth/register",upload.single("picture"),register);

//step 3 routes

app.use("./auth",authRoutes);

// step 7 usser routes
app.use.use("users",userRoutes);
//setting up mongoose

const PORT = process.env.PORT || 6001; //backup
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

  })
  .catch((error) => console.log(`${error} Did not Connect`));
