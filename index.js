const express = require('express')
const fs = require('fs')
const cors = require('cors')
const bodyParser = require('body-parser')
// const screenshot = require('url-to-screenshot')
// const Nightmare = require('nightmare')
const { MongoClient, ServerApiVersion } = require('mongodb')
// const { redirect } = require('react-router-dom')

const app = express()
// app.use(express.urlencoded({extended: true}))	// for parsing application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.urlencoded())
app.use(cors())
app.use(express.static("public"));

app.post('/', bodyParser.json(), function (req, res) {
	/* new screenshot('https://google.com')
		.width(800)
		.height(800)
		.capture()
		.then(img => {
			fs.writeFileSync(__dirname + '/pic.png', img)
			console.log('saved')
		}) */

	/* const nightmare = Nightmare({ show: 'true' })
	var n = nightmare.goto(req.body.url)
		.screenshot('g.png')
		.end()
		.then(console.log)
		.catch((e) => { console.log(e) })
	res.end(n) */
	res.end('heelo')
})

const uri = "mongodb+srv://alireza38:rostamidb555@cluster0.ra9lnyr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
app.post('/sendmessage', bodyParser.urlencoded({extended: true}), function (req, res) {
	console.log(req.body)
	const client = new MongoClient(uri)
	// res.statusMessage = 'sssssss'
	// res.redirect('http://localhost:3000')
	/* async function run() {
		try {
			await client.connect()
			// await client.db('mydb').command({ping: 1})
			var table = client.db('mydb').collection('firsttable')
			var all = await table.find({}).toArray(function (err, res) {
				if (err) throw err
			})
			console.log(all)
			console.log('success connect to database')
		} finally {
			await client.close()
		}
	} */
	async function run() {
		try {
			await client.connect()
			var table = client.db('mydb').collection('firsttable')
			var add = await table.insertOne({ name: req.body.name, email: req.body.email, text: req.body.text }, function (err, res) {
				if (err) throw err
			})
			console.log(add)
			res.send("<p>فرم با موفقیت ثبت شد</p><a href='http://localhost:3000'>برگشت به خانه</a>")
			console.log('success connect to database')
		}
		finally {
			await client.close()
		}
	}
	run().catch(console.dir)
	// res.send('hello')

})

app.get('/getallcomments', bodyParser.urlencoded({extended: true}), function (req, res) {
	const client = new MongoClient(uri)
	async function run() {
		try {
			await client.connect()
			var table = client.db('mydb').collection('firsttable')
			var all = await table.find({}).toArray(function (err, res) {
				if (err) throw err
			})
			console.log(all)
			res.send(all)
			console.log('success connect to database')
		}
		finally {
			await client.close()
		}
	}
	run().catch(console.dir)
})

app.listen(8000, () => { console.log('server run') })
