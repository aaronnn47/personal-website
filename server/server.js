require('dotenv').config()
const express = require('express'),
    massive = require('massive'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    axios = require('axios')
    pc = require('./controller/personal_controller')

const app = express()
app.use(bodyParser.json())

const {
    NODE_PORT,
    SECRET,
    REACT_APP_CLIENT_ID,
    REACT_APP_DOMAIN,
    CLIENT_SECRET,
    CONNECTION_STRING,
    NODE_ENV,
    STRIPE_SECRET
} = process.env

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
})

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true
}))

app.get('/auth/callback', async (req,res)=>{
    const payload = {
        client_id: REACT_APP_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `http://${req.headers.host}/auth/callback`
    }

    let resWithToken = await axios.post(
        `https://${REACT_APP_DOMAIN}/oauth/token`, 
        payload
    )
    let resWithUserData = await axios.get(
        `https://${REACT_APP_DOMAIN}/userinfo?access_token=${resWithToken.data.access_token}`
    )
    // console.log('user data', resWithUserData)
    let {
        email,
        name,
        picture,
        sub
    } = resWithUserData.data

    let db = req.app.get('db')
    let foundUser = await db.find_user([sub])
    if (foundUser[0]){
        req.session.user = foundUser[0]
        res.redirect('/#/home')
    }else{
        let createdUser = await db.create_user([name,email,picture,sub])
        req.session.user = createdUser[0]
        res.redirect('/#/home')
    }

})

function envCheck(req,res,next){
    console.log('middleware hit')
    if (NODE_ENV === 'dev'){
        req.app.get('db').get_user_by_id().then(userWithIdOne=>{
            req.session.user = userWithIdOne[0]
            next()
        })
    }else{
        next()
    }
}

function adminCheck(req,res,next){
    if( NODE_ENV === 'dev'){
        req.app.get('db').get_admin_by_id()
        .then(resp=>{
            req.session.admin = resp[0]
            next()
        })
    }else{
        next()
    }
}

app.get('/api/admin-data', adminCheck,(req,res)=>{
    if(req.session.admin){
        res.status(200).send(req.session.admin)
    }else{
        res.status(401).send('you are not authorized')
    }
    console.log(req.session)
})

app.get('/api/user-data', envCheck, (req,res)=>{
    if(req.session.user){
        res.status(200).send(req.session.user)
    }else{
        res.status(401).send('you are not authorized')
    }console.log(req.session)
})

app.get('/auth/logout', (req,res)=>{
    req.session.destroy()
    res.redirect('http://localhost:3000/')
})


app.post('/api/transactions', pc.addTransaction)
app.post('/api/sellTransactions',pc.sellTransaction)
app.get('/api/getbitcoin', pc.getTransaction)
app.get('/api/mens-clothes', pc.getMens)
app.get('/api/womens-clothes', pc.getWomens)
app.get('/api/kids-clothes',pc.getKids)
app.get('/api/get-accessories',pc.getAccessories)
app.get('/api/get-hat',pc.getHats)
app.post('/api/addtocart',pc.addtocart)
app.get('/api/getcart',pc.getcart)

app.post('/api/payment',pc.handlePayment)
app.delete(`/api/deleteItem/:id`,pc.deleteItem)
app.post('/api/shippingInfo', pc.addShipping)
app.get('/api/getShipping',pc.getShipping)
app.delete(`/api/removequantity/:id`,pc.removequantity)
app.put('/api/editFirstInfo/:id',pc.editFirstNameInfo)
app.put('/api/editlastInfo/:id',pc.editLastNameInfo)
app.put('/api/editAddressInfo/:id',pc.editAddressInfo)
app.put('/api/editCityInfo/:id',pc.editCityInfo)
app.put('/api/editStInfo/:id',pc.editStInfo)
app.put('/api/editZipInfo/:id',pc.editZipInfo)
app.delete('/api/deleteEverythingFromCart/',pc.deleteEverything)
app.post('/api/addToOrder',pc.addToOrder)
app.get('/api/getOrders',pc.getOrders)
app.post('/api/adminLogin',pc.adminLogin)

app.listen(NODE_PORT, () => {
    console.log(`listening on port ${NODE_PORT}`)
})

