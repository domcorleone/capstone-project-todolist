import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
const date = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const actualDate = date.toLocaleString('en-US', options); 
let dailyTask = [];
let workTask = [];
let seletedList = "";

// tell where the static files are
app.use(express.static("public"));

//use the body-parser here to get the info coming from the form
app.use(bodyParser.urlencoded({extended: true}));

// when loading the URL: localhost:3000 
app.get("/", (req, res) =>{    
    console.log("Current Date", actualDate); //Thursday, October 19, 2023
    seletedList = actualDate;
    res.render("index.ejs", { message: actualDate,  todoList: dailyTask });
});

// when click the link or menu: Today
app.get("/today", (req, res) =>{
    console.log("Current Date", actualDate); //Thursday, October 19, 2023
    seletedList = actualDate;
    res.render("index.ejs", { message: actualDate , todoList: dailyTask});
});

// when click the link or menu: Work
app.get("/work", (req, res) =>{
    seletedList = "Work List";
    res.render("index.ejs", { message: "Work List", todoList: workTask });
});

// when click the submit button: create a new task
app.post("/add", (req, res) =>{
    console.log(req.body["newTask"]);   
    if ( seletedList === "Work List") {
        workTask.push(req.body["newTask"])
    }
    else{
        dailyTask.push(req.body["newTask"]);
    }
    res.render("index.ejs", { message: seletedList, todoList: (seletedList === "Work List") ? workTask : dailyTask });
});

app.listen( port, (req, res)=> {
    console.log(`Server is running on port ${port}`);
});