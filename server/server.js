require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  bodyParser = require("body-parser"),
  session = require("express-session"),
  axios = require("axios");
(pc = require("./controller/personal_controller")),
  (nodemailer = require("nodemailer")),
  (path = require("path")),
  (gmailApiSync = require("gmail-api-sync"));

const app = express();
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../build`));

var gmailApiSync = require("gmail-api-sync");
let accessToken = require("../token.json");

gmailApiSync.setClientSecretsFile("./credentials.json");

var options = {
  query: "from:*",
  format: "full"
};

gmailApiSync.authorizeWithToken(accessToken, function(err, oauth) {
  if (err) {
    console.log("Something went wrong: " + err);
    return;
  } else {
    gmailApiSync.queryMessages(oauth, options, function(err, response) {
      if (err) {
        console.log("Something went wrong: " + err);
        return;
      }
      // console.log(JSON.stringify(response));
      app.get("/api/getEmails", (req, res) => {
        res.send(response);
      });
    });
  }
});

const {
  NODE_PORT,
  SECRET,
  REACT_APP_CLIENT_ID,
  REACT_APP_DOMAIN,
  CLIENT_SECRET,
  CONNECTION_STRING,
  NODE_ENV,
  USERNAME,
  PASSWORD
} = process.env;

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
});

app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true
  })
);

// app.use((request, response, next) => {
//     response.header("Access-Control-Allow-Origin", "*");
//     response.header("Access-Control-Allow-Headers", "Content-Type");
//     next();
//   });

app.get("/auth/callback", async (req, res) => {
  const payload = {
    client_id: REACT_APP_CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: req.query.code,
    grant_type: "authorization_code",
    redirect_uri: process.env.MY_AUTH
  };

  let resWithToken = await axios.post(
    `https://${REACT_APP_DOMAIN}/oauth/token`,
    payload
  );
  let resWithUserData = await axios.get(
    `https://${REACT_APP_DOMAIN}/userinfo?access_token=${
      resWithToken.data.access_token
    }`
  );
  console.log("user data", resWithUserData);
  let { email, name, picture, sub } = resWithUserData.data;

  let db = req.app.get("db");
  let foundUser = await db.find_user([sub]);
  if (foundUser[0]) {
    req.session.user = foundUser[0];
    res.redirect("/#/home");
  } else {
    let createdUser = await db.create_user([name, email, picture, sub]);
    req.session.user = createdUser[0];
    res.redirect("/#/home");
  }
});

function envCheck(req, res, next) {
  console.log("middleware hit");
  if (NODE_ENV === "dev") {
    req.app
      .get("db")
      .get_user_by_id()
      .then(userWithIdOne => {
        req.session.user = userWithIdOne[0];
        next();
      });
  } else {
    next();
  }
}

function adminCheck(req, res, next) {
  if (NODE_ENV === "dev") {
    req.app
      .get("db")
      .get_admin_by_id()
      .then(resp => {
        req.session.admin = resp[0];
        next();
      });
  } else {
    next();
  }
}

app.get("/api/admin-data", adminCheck, (req, res) => {
  if (req.session.admin) {
    res.status(200).send(req.session.admin);
  } else {
    res.status(401).send("you are not authorized");
  }
  console.log(req.session);
});

app.get("/api/user-data", envCheck, (req, res) => {
  if (req.session.user) {
    res.status(200).send(req.session.user);
  } else {
    res.status(401).send("you are not authorized");
  }
  console.log(req.session);
});

app.get("/auth/logout", (req, res) => {
  req.session.destroy();
  res.redirect(process.env.SUCCESS);
});

app.post("/api/send", (req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: USERNAME,
      pass: PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  let { text } = req.body;

  let mailOptions = {
    from: `'Aaron' <practicedevmountain@gmail.com>`,
    to: USERNAME,
    subject: "New Order",
    text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }

    res.render("contact", { msg: "email has been sent" });
  });
});

app.post("/api/transactions", pc.addTransaction);
app.post("/api/sellTransactions", pc.sellTransaction);
app.get("/api/getbitcoin", pc.getTransaction);
app.get("/api/mens-clothes", pc.getMens);
app.get("/api/womens-clothes", pc.getWomens);
app.get("/api/kids-clothes", pc.getKids);
app.get("/api/get-accessories", pc.getAccessories);
app.get("/api/get-hat", pc.getHats);
app.post("/api/addtocart", pc.addtocart);
app.get("/api/getcart", pc.getcart);

app.post("/api/payment", pc.handlePayment);
app.delete(`/api/deleteItem/:id`, pc.deleteItem);
app.post("/api/shippingInfo", pc.addShipping);
app.get("/api/getShipping", pc.getShipping);
app.delete(`/api/removequantity/:id`, pc.removequantity);
app.put("/api/editFirstInfo/:id", pc.editFirstNameInfo);
app.put("/api/editlastInfo/:id", pc.editLastNameInfo);
app.put("/api/editAddressInfo/:id", pc.editAddressInfo);
app.put("/api/editCityInfo/:id", pc.editCityInfo);
app.put("/api/editStInfo/:id", pc.editStInfo);
app.put("/api/editZipInfo/:id", pc.editZipInfo);
app.delete("/api/deleteEverythingFromCart/", pc.deleteEverything);
app.post("/api/addToOrder", pc.addToOrder);
app.get("/api/getOrders", pc.getOrders);
app.post("/api/adminLogin", pc.adminLogin);
app.post("/api/todo", pc.addTodo);
app.get("/api/getTodo", pc.getTodo);

app.listen(process.env.NODE_PORT, () => {
  console.log(`listening on port ${NODE_PORT}`);
  // console.log(NODE_ENV)
});
