const express = require('express');
var passwordHash = require('password-hash');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/platform')
let db = mongoose.connection



const router = express.Router()

//GET POST
router.get('/', async (req, res) => {
    let posts = await loadPostCollection()
    res.send(await posts.find({}).toArray())
});

//ADD POST
router.post('/', async (req, res) => {
    let posts = await loadPostCollection()
    await posts.insertOne({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: passwordHash.generate(req.body.password)
    })
    res.status(201).send();
});
//GET USERS
router.get('/:id', async (req, res) => {
    let posts = await loadPostCollection()
    let results = await posts.findOneAndUpdate({
        _id: new mongoose.Types.ObjectId(req.params.id),
    }, {
        $set: {
            message: 'vous avez recu une invitation'
        }
    })
    console.log(results)
    res.status(200).send();
});
//UPDATE POST

async function loadPostCollection() {
    let res = await db.collection('posts')
    return res
}


module.exports = router