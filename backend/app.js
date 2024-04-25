import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import conneected from "./db/db.js";
import route from "./routes/route.js";
dotenv.config()

const app=express();
const port=process.env.PORT;

app.use(cors());
  
app.use(express.json());
conneected();
app.use('/api',route)

app.listen(port,()=>{
    console.log(`server conneected to port ${port}`)
})