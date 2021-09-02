const express = require("express")//beckend language
const bodyParser = require("body-parser")//to req the body
const bcrypt = require("bcrypt-nodejs")//to hash the passowrd
const cors = require('cors')//nessasary to responsing 
const knex = require('knex')//for database connection

const register = require("./controllers/register")//register.js
const signin = require("./controllers/signin")//signin.js
const profile = require("./controllers/profile")//profile.js
const image = require("./controllers/image")//image.js

const { response } = require("express")


//*************Database connection****************
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 
const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
  });

db.select('*').from('users').then(data => {
    console.log(data)
});

//******************************/
//************server connection***********//
const app = express();

app.use(cors())
app.use(bodyParser.json())


app.get("/", (req, res) => {
    res.send('success')
})

//*************signing user************** */
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt) })
//******************************** */

//***********Registering user*******************/
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt) })
//*****************************/

//************profile*********** */
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)} )
//***************************** */

//*****************image****************** */
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
//************************************* */

//**************api call*************** */
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res, input)})
//always do api call at the beck-end***********


 //process.env.PORT
//*****to listen to the dynamic port not a single port */
//********with using environmental variable */
app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
});


/*
/ --> res = this is workin
/signin --> res = POST = sucess/fail  (we use post here because we dont want to show the password as query request)
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user



*/