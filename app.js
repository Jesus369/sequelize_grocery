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

app.get('/', (req,res) => {
	res.redirect('/website')
})

// HOMEPAGE
app.get('/website', (req,res) => {
	res.render('home')
})

// ALL STORES PAGE
app.get('/website/stores', (req,res) => {
	models.store.findAll().then((store) => {
		res.render('stores', {store : store})
	})
})

app.get('/website/stores/addstore', (req,res) => {
	res.render('newstore')
})

// ALL ITEMS PAGE
app.get('/website/stores/items', (req,res) => {
	models.product.findAll().then((item) => {
		res.render('items',{iteminfo : item})
	})
})

// SHOW STORE PAGE
app.get('/website/stores/:id', (req,res) => {
	models.store.findAll(
		{where:{
			id:req.params.id
		}, include : [{
			required : false,
			model : models.product, as : 'product'
		}],
		raw : false
	})
	.then((iteminfo) => {
		res.render('showStore',{iteminfo:iteminfo})
	})
})

// SHOW ITEM PAGE
app.get('/website/stores/items/:id', (req,res) => {
	models.product.findAll({where:{id:req.params.id}})
	.then((iteminfo) => {
		res.send(iteminfo)
	})
})

app.post('/website/stores', (req,res) => {
	models.store.create({
		storename : req.body.storename,
		addressone : req.body.addressone,
		addresstwo : req.body.addresstwo,
		city : req.body.city,
		state : req.body.state,
		zip : req.body.zip
	}).then(() => {
		res.redirect('/website/stores')
	})
})

// ADD PRODUCT
app.post('/website/stores/:id', (req,res) => {
	models.product.create({
		name : req.body.name,
		cost : req.body.cost,
		quantity : req.body.quantity,
		storeid : req.params.id
	}).then( () => {
		res.redirect('/website/stores/'+req.params.id)
	})
})

//DELETE STORE
app.delete('/website/stores/:id?', (req,res) => {
	models.store.destroy({where: {id : req.params.id}} )
	.then(() => { res.redirect('/website/stores')} )
})

// DELETE PRODUCT
app.delete('/website/stores/items/:id?', (req,res) => {
	models.product.destroy( {where: {storeid:req.params.id}} )
	.then( () => { res.redirect('/website/stores')} )
})

app.listen(3000, () => {
	console.log('We are live on channel 3000!')
})
