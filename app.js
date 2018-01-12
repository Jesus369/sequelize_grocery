const mustacheExpress = require('mustache-express')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const models = require('./models')
const express = require('express')
const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.engine("mustache", mustacheExpress())
app.use(methodOverride('_method'))
app.set("view engine","mustache")
app.set('views', './views')

/* FIND ALL
models.store.findAll().then(function(task) {
	console.log(task)
})

models.store.create({
	storename: "Walmart",
	addressone: "4355 Spring Branch",
	addresstwo: "None",
	city: "Houston",
	state: "Texas",
	zip: 77345
}) .then(newStore => {
	console.log("The store " + newStore.storename + " has been created!")
})


models.store.destroy({
	where: {
		id : 3
	}
}) .then(deletedStore => {
		console.log(deletedStore + " store has been deleted")
	})
*/

app.get('/', (req,res) => {
	res.redirect('/stores')
})

app.get('/stores', (req,res) => {
	models.store.findAll().then( (information) => {
		res.render('stores', {info : information})
	})
})

app.get('/stores/newstore', (req,res) => {
	res.render('newStore')
})

app.post('/stores', (req,res) => {
	let storename = req.body.storename
	let addressone = req.body.addressone
	let addresstwo = req.body.addresstwo
	let city = req.body.city
	let state = req.body.state
	let zip = req.body.zip

	models.store.create({
		storename : storename,
		addressone : addressone,
		addresstwo : addresstwo,
		city : city,
		state : state,
		zip : zip
	}) .then(() => {
		res.redirect('/stores')
	})
})

app.get('/stores/:id', (req,res) => {
	res.send("This is the stores id")
})

app.delete('/stores/:id', (req,res) => {
	models.store.destroy({
		where: {
			id : req.params.id
		}
	}).then(() => {
		res.redirect('/stores')
	})
})

app.listen(3000, () => {
	console.log('We are live on channel 3000!')
})