const { MongoClient } = require('mongodb')
const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'passOP'
dotenv.config()
const app = express()
const port = 3000

// app.use(cors)
app.use(bodyParser.json())
app.use(cors())
client.connect()

app.get('/', async (req, res) => {
  const db = client.db(dbName)
  const collection = db.collection('passwords')
  const result = await collection.find({}).toArray()
  res.json(result)
})

app.post('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName)
  const collection = db.collection('passwords')
  const result = await collection.insertOne(password)
  res.send({ success: true })
})

app.delete('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName)
  const collection = db.collection('passwords')
  const result = await collection.deleteOne(password)
  res.send({ success: true })
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost/${port}`)
})