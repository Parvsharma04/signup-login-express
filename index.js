const bodyParser = require('body-parser')
const express = require('express')
const {MongoClient} = require('mongodb')

const app = express()
const port = 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))



const url = 'mongodb+srv://parv:12341234@task-manager.kwcw1do.mongodb.net/'
const client = new MongoClient(url)
app.use(express.urlencoded({extended: true}))
app.use(express.json())



app.get('/', async (req, res)=>{
    try {
        await client.connect()
        const db = client.db('DB_CLASS')
        const collection = db.collection('one')
        const data = collection.find({}).toArray()
        res.json(data)
    } catch (error) {
        res.send(error)
    }
})


app.get('/register', (req, res)=>{
    res.sendFile('/signup.html',{root:'./public'})
})


app.post('/register', async(req, res)=>{
    await client.connect()
        const db = client.db('DB_CLASS')
        const collection = db.collection('one')
        const response = await collection.insertOne(req.body);
        console.log(response)
        client.close()
        res.redirect('/login')
})

app.get('/login', (req, res)=>{
    res.sendFile('/login.html', {root: './public'})
})

app.post('/login', async(req, res)=>{
    await client.connect()
        const db = client.db('DB_CLASS')
        const collection = db.collection('one')
    if(collection.find( {$and : [{username: req.body.username}, {password: req.body.password}]})){
        res.send('logged in Successfully')
    }
    else{
        res.redirect('/register')
    }
})