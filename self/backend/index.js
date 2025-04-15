import express from "express"
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors"
import connectDB from "./models/db.js";
import auth from "./routes/auth.js"

dotenv.config();

const PORT=process.env.PORT || 5000;

const app=express();
//app.use(bodyParser.json());
app.use(express.json());
app.use(cors())

app.use('/auth',auth);

// app.post('/signup',(req,res)=>{
//   User.create(req.body)
//   .then(user=>res.json(user))
//   .catch(err => res.json(err));
// })

// app.post('/login',(req,res)=>{
//     const {email,password}=req.body;
//     User.findOne({email:email,password:password})
//     .then(user=>{
//         if(user){
//         if(user.password===password){
//             res.json("Success")
//         }
//         else{
//             res.json("Password is incorrect")
//         }
//     }
//     else{
//         res.json("No record existed")
//     }
//     })
// })


connectDB();


app.listen(PORT,()=>{
    console.log(`Server runing on PORT http://localhost:${PORT}`);
    
});