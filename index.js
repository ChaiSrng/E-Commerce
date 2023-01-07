const express = require('express');
const app = express();
require('./db/config');
const User = require('./db/User');
const cors = require('cors');
const Product = require('./db/Product');

const jwt = require('jsonwebtoken');

//Based on this key the token will get genearted.This is a secret,it shouldnt be accessible to any unknow person
const jwtKey = 'e-comm';
//This can also be kept in a file

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err)
            res.send({ result: "Something went wrong!" })
        else
            res.send({ result, auth: token })
    })
})

app.post('/login', async (req, res) => {
    if (req.body.password && req.body.email) {
        let result = await User.findOne(req.body).select("-password");
        if (result) {
            jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err)
                    res.send({ result: "Something went wrong!" })
                else
                    res.send({ result, auth: token })
            })
        }
        else
            res.send({ result: "No User found!!" })
    }
    else
        res.send({ result: "Please provide valid Email and Password" })
})

app.post('/add-product',verifyToken, async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

app.get('/products',verifyToken, async (req, res) => {
    //using and to filter out unwanted records created earlier
    let products = await Product.find({

        "$and": [

            { "name": { "$ne": null } },
            { "priceInRs": { "$ne": null } }
        ]
    });
    console.log(products);
    if (products.length > 0)
        res.send(products);
    else
        res.send({ result: "No Products found!" })
})

app.delete('/deleteProduct',verifyToken, async (req, res) => {
    await Product.deleteOne({ "_id": req.body._id });
    res.send({ result: "Product deleted!" });
})

app.get('/product/:_id',verifyToken, async (req, res) => {
    let product = await Product.findOne({ _id: req.params._id });
    if (product)
        res.send(product);
    else
        res.send({ result: "No Records found!" });
})

app.put('/product/:id',verifyToken, async (req, res) => {
    let result = await Product.updateOne({ _id: req.params.id }, { $set: req.body });
    res.send(result);
})

app.get('/search/:key',verifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { company: { $regex: req.params.key } }
        ],
        "$and": [

            { "name": { "$ne": null } },
            { "priceInRs": { "$ne": null } }
        ]
    })
    res.send(result);
})

function verifyToken(req,res,next){
    let token = req.headers['authorization']; //passing the headers of the api
    if(token){
        token = token.split(' ')[1];
        jwt.verify(token,jwtKey,(err,valid)=>{
            if(err)
                res.status(401).send({result: "Please provide valid token"})
            else
                next();
        })
    }else{
        res.status(403).send({result : "Please add token in header"});
    }
}

app.listen(5000);