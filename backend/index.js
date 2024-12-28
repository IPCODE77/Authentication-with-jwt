const express = require('express');
const port = 8085;
const mongoose = require('mongoose');
const databas = require('./properties/application.json');
const router = require('./router/user');
const cors = require('cors');
const cookie = require("cookie-parser");
const cookieParser = require('cookie-parser');



const databaseUrl = databas.localhost;

mongoose.connect(databaseUrl)
.then(()=>{
    console.log("Database coonnected");
})


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,  
  }));
app.use('/user',router);

app.listen(port,()=>{
    console.log("Running In Port Number 8085");
})