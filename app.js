const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/myapp');
let db = mongoose.connection;

//check connections
db.once('open', function () {
    console.log('Connected to MongoDB');
});

//check for db errors
db.on('error', function (err) {
    console.log(err);
});

// Init App
const app = express();

//Bring in Models
let Material = require('./models/material')

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Body Parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}))
//parse application/json
app.use(bodyParser.json());

//Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));


//Home route
app.get('/', function (req, res) {
    Material.find({}, function (err, materials) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                title: 'Materials',
                materials: materials
            });
        }
    });
});

//Get Single Material
app.get('/materials/:id', function (req, res) {
    Material.findById(req.params.id, function (err, material) {
        res.render('material', {
            title: 'Get Material',
            material: material
        });
    });
});




// //Add Route
app.get('/materials/add', function (req, res) {
    res.render('add_material', {
        title: 'Add Material'
    });
});

//Add Submit POST Route
app.post('/materials/add', function (req, res) {
    let material = new Material();
    material.CompoundNumber = req.body.CompoundNumber;
    material.Cost = req.body.Cost;
    material.Description = req.body.Description;
    material.SpecificGravity = req.body.SpecificGravity;
    material.Color = req.body.Color;

    material.save(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    });
});

//Load Edit Form
app.get('/materials/edit/:id', function (req, res) {
    Material.findById(req.params.id, function (err, material) {
        res.render('edit_material', {
            title: "Edit Material",
            material: material
        });
    });
});

//Update Submit POST Route
app.post('/materials/edit/:id', function (req, res) {
    let material = {};
    material.CompoundNumber = req.body.CompoundNumber;
    material.Cost = req.body.Cost;
    material.Description = req.body.Description;
    material.SpecificGravity = req.body.SpecificGravity;
    material.Color = req.body.Color;

    let query = {
        _id: req.params.id
    }

    Material.findById(req.params.id, material, function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    });
});

//delete
app.delete('/material/:id', function (req, res) {
    let query = {
        _id: req.params.id
    }

    Material.deleteOne(query, function (err) {
        if (err) {
            console.log(err);
        }
        res.send('Success');
    });
});

// //Start Server
app.listen(3000, function () {
    console.log('serve started on port 3000....')
});