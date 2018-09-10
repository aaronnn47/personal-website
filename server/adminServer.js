require('dotenv').config()
const express = require('express'),
      massive = require('massive'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      ac = require('./controller/admin_controller')

const app = express()
app.use(bodyParser.json())



const {
    ADMIN_PORT
} = process.env

app.get('/admin/getOrders',ac.getOrders)






app.listen(ADMIN_PORT,()=>{
    console.log(`listening on admin port ${ADMIN_PORT}`)
})