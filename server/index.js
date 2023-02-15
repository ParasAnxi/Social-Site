import express from "express"**;
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url"; //set the path when we configure directry


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