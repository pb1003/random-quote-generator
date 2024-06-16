import express from 'express';
import cors from 'cors'
import { PrismaClient } from '@prisma/client';
import {hashSync} from 'bcrypt'
import bodyParser from 'body-parser'
import session from 'express-session'
import connectPgSimple from "connect-pg-simple"
import passport from '../config/passportConfig.js'; 
import dotenv  from 'dotenv';


// import cookieParser from "cookie-parser"
// import jwt,{JstPayload} from "jsonwebtoken"
import path from "path" // concatenates path

const JWT_SECRET = "test123";




// TypeScript is a statically typed language and it needs to know the types of all objects at compile time.
// But the ts does not know about the type of express.. therefore we need to install the type defs of this object


const prisma = new PrismaClient()
const app = express()

app.use(session({
    store: new (connectPgSimple(session))({
        conString: process.env.DATABASE_URL,
    }),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
  }))

const PORT = 3000

app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cors({
//     credentials:true,
//     origin:"http:localhost:5173"
// }))
// single frontend that should be able to send a cookie with credentials
// app.use(cookieParser());


//route handler for HTTP GET requests
app.get('/', (req, res) => {
    res.send('Hello world')
    // res.send(new Buffer('wahoo'));
    // res.send({ some: 'json' }); // automatically set Content-type as application/json in header
    // res.send('<p>some html</p>'); // automatically set Content-type as text/html in header
    // res.status(404).send('Sorry, cant find that'); // automatically set Content-type as text/html in header
})

app.get('/about', (req, res) => {
    res.send('This is a quote generator website')
})

app.post('/insertQuote', async (req, res) => {

    const { quote } = req.body
    if (!quote) {
        res.status(400).send('quote is required')
        return
    }

    try {
        const result = await prisma.master.create({
            data: {
                quote
            }
        })
        console.log(`result:::`, result)
        res.status(200).send('Successfully inserted')
    }
    catch (error) {
        res.status(500).send('Failed insertion')
    }

})


app.get('/getQuote',async(req,res)=>{
    
    try {

    
    const count = await prisma.master.count()
    const randomOffset = Math.floor(Math.random() * count)
    const randomQuote = await prisma.master.findFirst({
        skip:randomOffset
    })

    if(!randomQuote){
        return res.status(404).send('No quotes found')
    }
    
    return res.status(200).json(randomQuote);
    }

    catch (error){
        console.error(`error fetching the data`, error)
        return res.status(500).send('Failed to fetch the random quote')
    }

}
)


app.post('/register',async(req,res)=>{
console.log("***** in /register ******")
    try {
    const result = await prisma.user.create({
        data :{
            username:req.body.username,
            // password : req.body.password
            password:hashSync(req.body.password,10)

        }
    })
    console.log(`result:::`, result)
    res.status(200).send("inserted the user")
}
catch (error){
    console.error(error)
}

    
    // res.
})

app.post('/login',passport.authenticate('local',{successRedirect:'protected'}))

app.get('/protected',(req,res)=>{
    console.log(req.session)
    console.log(req.user)

    res.send("protected")  
})

app.get('/logout',(req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
      });
    // res.redirect('login')

})
app.get('/login', (req, res) => {
    res.render('login')
})

//TODO implement this function for admin
app.post('/deleteQuote', (req,res)=>{

})

app.listen(PORT, () => {
    console.log(`Server is listening on the port ${PORT}`)
})


// we can set content type manually as res.setHeader('Content-Type','text/html')
// or use res.type('json')

