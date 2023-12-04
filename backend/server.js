// Import the functions you need from the SDKs you need

const firebase = require("firebase/app");
const firebaseDatabase = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyCxw_16F_RIHcKZTNHdNWc7MnTGtTzXzpQ",
  authDomain: "test-c47e7.firebaseapp.com",
  databaseURL: "https://test-c47e7-default-rtdb.firebaseio.com",
  projectId: "test-c47e7",
  storageBucket: "test-c47e7.appspot.com",
  messagingSenderId: "763986909354",
  appId: "1:763986909354:web:80fd1c1a706826b35dd8d3",
  measurementId: "G-PKY93ZJ2ZR",
};

// Initialize Firebase

const fb = firebase.initializeApp(firebaseConfig);
db = firebaseDatabase.getDatabase(fb);

const express = require("express");
const fs = require("fs");
const web3 = require("web3");
const app = express();
const port = 3000;

app.use(express.json());

// CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

function deepSerializeInts(obj) {
  if (typeof obj === "bigint") {
    return obj.toString();
  } else if (typeof obj === "object") {
    for (key in obj) {
      obj[key] = deepSerializeInts(obj[key]);
    }
  }
  return obj;
}

client = new web3.Web3("http://localhost:7545");
contractBinPath = "./built/contracts_LockableNFT_sol_LockableNFT.bin";
contractAbiPath = "./built/contracts_LockableNFT_sol_LockableNFT.abi";
gasFee = 10000000;
gasPrice = "875000000";

ref = firebaseDatabase.ref(db, "/users/admin");

// firebaseDatabase.set(ref, {
//   // "admin": {
//     "login": "admin",
//     "password": "admin",
//     "accountId": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
//   // }
// });

// ref = firebaseDatabase.ref(db, '/users/me')

// firebaseDatabase.set(ref, {
//   // "me": {
//     "login": "lizavetta.vl@gmail.com",
//     "password": "Iamstrongwoman",
//     "accountId": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
//   // }
// });

app.get("/Contracts", (req, res) => {
  ref = firebaseDatabase.ref(db, "/contracts");
  firebaseDatabase.get(ref).then((snapshot) => {
    res.send(snapshot.val());
  });
});

app.get("/Account", (req, res) => {
  if (!("login" in req.query && "password" in req.query)) {
    res.status(400);
    res.send("Missing field: login or password");
    return;
  }

  login = req.query.login;
  password = req.query.password;

  ref = firebaseDatabase.ref(db, "/users");
  firebaseDatabase.get(ref).then((snapshot) => {
    users = snapshot.val();
    for (key in users) {
      console.log(users[key]);
      console.log(login);
      console.log(password);

      if (users[key].password == password && users[key].login == login) {
        res.send(users[key].accountId);
        return;
      }
    }
    res.status(400);
    res.send("Wrong login or password");
  });
});

app.get("/Accounts", (req, res) => {
  client.eth.getAccounts().then((accounts) => {
    res.send(accounts);
  });
});

app.post("/New", (req, res) => {
  required_fields = ["name", "accountId", "imageLink", "price"];

  body = req.body;

  for (field of required_fields) {
    if (!(field in body)) {
      res.status(400);
      res.send("Missing field: " + field);
      return;
    }
  }

  bytecode = fs.readFileSync(contractBinPath).toString();
  abi = JSON.parse(fs.readFileSync(contractAbiPath).toString());

  contract = new client.eth.Contract(abi)
    .deploy({
      data: bytecode,
      arguments: [
        body.name,
        "NFT",
        body.imageLink,
        parseInt(body.price),
        body.accountId,
      ],
    })
    .send({
      from: body.accountId,
      gas: gasFee,
      gasPrice: gasPrice,
    })
    .then((contract) => {
      res.send(contract.options.address);

      ref = firebaseDatabase.ref(db, "/contracts/" + contract.options.address);
      firebaseDatabase.set(ref, {
        name: body.name,
        imageLink: body.imageLink,
        price: body.price,
        owner: body.accountId,
      });

      contract.methods
        .blockTimestamp()
        .call()
        .then((blockTimestamp) => {
          console.log("Block timestamp:", blockTimestamp.toString());
        });
    })
    .catch((err) => {
      console.log("Error:", err);
      console.log("Request body:", req.body);
      res.status(400);
      res.send(err);
    });
});

app.get("/GetImageLink", (req, res) => {
  required_fields = ["contractAddress"];

  for (field of required_fields) {
    if (!(field in req.query)) {
      res.status(400);
      res.send("Missing field: " + field);
      return;
    }
  }

  abi = JSON.parse(fs.readFileSync(contractAbiPath).toString());
  contract = new client.eth.Contract(abi, req.query.contractAddress);
  contract.methods
    .imageLink()
    .call()
    .then((imageLink) => {
      console.log("Image link:", imageLink);
      res.send(imageLink);
    });
});

app.get("/GetPrice", (req, res) => {
  required_fields = ["contractAddress"];

  for (field of required_fields) {
    if (!(field in req.query)) {
      res.status(400);
      res.send("Missing field: " + field);
      return;
    }
  }

  abi = JSON.parse(fs.readFileSync(contractAbiPath).toString());
  contract = new client.eth.Contract(abi, req.query.contractAddress);
  contract.methods
    .price()
    .call()
    .then((price) => {
      console.log("Price:", price.toString());
      res.send(price.toString());
    });
});

app.post("/Lock", (req, res) => {
  required_fields = ["contractAddress", "accountId", "duration"];
  body = req.body;

  for (field of required_fields) {
    if (!(field in body)) {
      res.status(400);
      res.send("Missing field: " + field);
      return;
    }
  }

  duration = parseInt(body.duration);

  abi = JSON.parse(fs.readFileSync(contractAbiPath).toString());
  contract = new client.eth.Contract(abi, body.contractAddress);
  contract.methods
    .blockTimestamp()
    .call()
    .then((blockTimestamp) => {
      console.log("Block timestamp:", blockTimestamp.toString());
    });

  contract.methods
    .lock(duration)
    .send({
      from: body.accountId,
      gas: gasFee,
      gasPrice: gasPrice,
    })
    .then((lock) => {
      console.log("Lock:", deepSerializeInts(lock));
      res.send(deepSerializeInts(lock));
    });
});

app.post("/SetPrice", (req, res) => {
  required_fields = ["contractAddress", "accountId", "price"];

  body = req.body;

  for (field of required_fields) {
    if (!(field in body)) {
      res.status(400);
      res.send("Missing field: " + field);
      return;
    }

    if (field == "price") {
      body[field] = parseInt(body[field]);
    }
  }

  abi = JSON.parse(fs.readFileSync(contractAbiPath).toString());
  contract = new client.eth.Contract(abi, body.contractAddress);
  contract.methods
    .setPrice(body.price)
    .send({
      from: body.accountId,
      gas: gasFee,
      gasPrice: gasPrice,
    })
    .then((setPrice) => {
      console.log("Set price:", deepSerializeInts(setPrice));
      res.send(deepSerializeInts(setPrice));
    })
    .catch((err) => {
      console.log("Error:", deepSerializeInts(err));
      res.status(400);
      res.send(deepSerializeInts(err));
    });
});

app.get("/GetPrice", (req, res) => {
  required_fields = ["contractAddress"];

  for (field of required_fields) {
    if (!(field in req.query)) {
      res.status(400);
      res.send("Missing field: " + field);
      return;
    }
  }

  abi = JSON.parse(fs.readFileSync(contractAbiPath).toString());
  contract = new client.eth.Contract(abi, req.query.contractAddress);
  contract.methods
    .price()
    .call()
    .then((price) => {
      console.log("Price:", price.toString());
      res.send(price.toString());
    });
});

app.get("/GetOwner", (req, res) => {
  required_fields = ["contractAddress"];

  for (field of required_fields) {
    if (!(field in req.query)) {
      res.status(400);
      res.send("Missing field: " + field);
      return;
    }
  }

  abi = JSON.parse(fs.readFileSync(contractAbiPath).toString());
  contract = new client.eth.Contract(abi, req.query.contractAddress);
  contract.methods
    .owner()
    .call()
    .then((owner) => {
      console.log("Owner:", owner);
      res.send(owner);
    });
});

app.post("/Buy", (req, res) => {
  required_fields = ["contractAddress", "accountId"];

  body = req.body;

  for (field of required_fields) {
    if (!(field in body)) {
      res.status(400);
      res.send("Missing field: " + field);
      return;
    }
  }

  abi = JSON.parse(fs.readFileSync(contractAbiPath).toString());
  contract = new client.eth.Contract(abi, body.contractAddress);
  contract.methods
    .buy()
    .send({
      from: body.accountId,
      gas: gasFee,
      gasPrice: gasPrice,
      value: body.price,
      to: body.contractAddress,
    })
    .then((buy) => {
      console.log("Buy:", deepSerializeInts(buy));
      res.send(deepSerializeInts(buy));

      ref = firebaseDatabase.ref(db, "/contracts/" + body.contractAddress);
      firebaseDatabase.update(ref, {
        owner: body.accountId,
      });

    })
    .catch((err) => {
      console.log("Error:", deepSerializeInts(err));
      res.status(400);
      res.send(deepSerializeInts(err));
    });
});

app.use(function (err, req, res, next) {
  console.log("Error:", err);
  res.end(err.message); // this catches the error!!
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
