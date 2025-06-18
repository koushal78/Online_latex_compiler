import express from "express";
import route from "./routes/compileRoutes.js";
import dotenv from 'dotenv'
import cors from "cors";
import bodyParser from "body-parser";
dotenv.config();




const Port  = process.env.PORT || 8000
const app = express();
app.use(cors())
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("LaTeX Compiler API is running ✅");
});

app.use('/api/compile',route);


app.listen(Port,()=>{
    console.log(`server is running Port -> ${Port}`);
})