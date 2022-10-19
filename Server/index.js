const express=require('express')
const app= express()
const mysql=require('mysql')
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "trainreservation"
});

app.post('/create',(req,res)=>{
    const Fname=req.body.Fname;
    const Lname=req.body.Lname;
    const address=req.body.address;
    const mail=req.body.mail;
    const number=req.body.number;
    const gender=req.body.gender;
    const dob=req.body.dob;
    const auth=req.body.auth;

    db.query('INSERT INTO passenger(Fname,Lname,address,mail,number,gender,dob,auth) VALUES(?,?,?,?,?,?,?,?)',[Fname,Lname,address,mail,number,gender,dob,auth],(err,result)=>{
        if(err){
            console.log(err);

        }
        else{
            res.send(result);
        }
    } );
});

app.post('/traveldetails',(req,res)=>{
    const pickup=req.body.pickup;
    const dropoff=req.body.dropoff;
    const seat=req.body.seat;
    const createdAt=req.body.createdAt;
    const confirmedTrain=req.body.confirmedTrain;
    db.query('INSERT INTO traveldetails(source,destination,seat,traveldate,trainno) VALUES(?,?,?,?,?)',[pickup,dropoff,seat,createdAt,confirmedTrain],(err,result)=>{
        if(err){
            console.log(err);

        }
        else{
            res.send(result);
        }
    } );


});

app.post('/paymentdetails',(req,res)=>{
    const transactionid=req.body.transactionid;
    const cardno=req.body.cardno;
    const cardType=req.body.cardType;
    const validdate=req.body.validdate;
    const cardCvv=req.body.cardCvv;
    db.query('INSERT INTO paymentdetails(transactionid,cardno,cardtype,validdate,cvv) VALUES(?,?,?,?,?)',[transactionid,cardno,cardType,validdate,cardCvv],(err,result)=>{
        if(err){
            console.log(err);

        }
        else{
            res.send(result);
        }
    } );


});
app.get("/trainreservation", (req, res) => {
    db.query('SELECT * FROM passenger', (err, result, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.get("/p1details", (req, res) => {
    db.query('SELECT * FROM traveldetails', (err, result, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.get("/trainlistbc", (req, res) => {
    db.query('SELECT * FROM trainreservation.traindetails where source="BANGALORE" AND destination="CHENNAI"', (err, result, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.get("/trainlistbd", (req, res) => {
    db.query('SELECT * FROM trainreservation.traindetails where source="BANGALORE" AND destination="DELHI"', (err, result, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.get("/trainlistcb", (req, res) => {
    db.query('SELECT * FROM trainreservation.traindetails where source="CHENNAI" AND destination="BANGALORE"', (err, result, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.get("/trainlistcd", (req, res) => {
    db.query('SELECT * FROM trainreservation.traindetails where source="CHENNAI" AND destination="DELHI"', (err, result, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.get("/trainlistdb", (req, res) => {
    db.query('SELECT * FROM trainreservation.traindetails where source="DELHI" AND destination="BANGALORE"', (err, result, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.get("/trainlistdc", (req, res) => {
    db.query('SELECT * FROM trainreservation.traindetails where source="DELHI" AND destination="CHENNAI"', (err, result, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});
app.get("/ticketlist", (req, res) => {
    db.query('SELECT * FROM trainreservation.traveldetails,trainreservation.traindetails,trainreservation.passenger WHERE passenger.accid=(SELECT MAX(accid) from trainreservation.passenger) AND traveldetails.accid=(SELECT MAX(accid) from trainreservation.traveldetails) AND traindetails.trainno=traveldetails.trainno', (err, result, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

app.listen(3001,()=>{
    console.log('hey my server is running on host 3001')
})