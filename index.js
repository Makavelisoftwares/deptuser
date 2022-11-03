const express=require('express');
const app=express();
const mongoose=require('mongoose');
const helmet=require('helmet');
const morgan=require('morgan');
const bodyParser=require('body-parser');
require('dotenv').config();
const methodOverride=require('method-override');
const {sequelize,patients}=require('./models')
const port=5000;

// connecting mongodb database 
sequelize.authenticate()
    .then(()=>{
        console.log('connected to the practise database');
        app.listen(port,()=>{
            console.log('listening to requests on port ' +port)
        })
    })
    .catch((err)=>console.log(err))

// setting the view template and enabling the static files
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(morgan('common'));
app.use(helmet());
app.use(methodOverride('_method'))



// ADD USER PAGE
app.post('/users',(req,res)=>{
    const body=req.body;

    patients.create(body)
        .then((results)=>{
            res.redirect('/users')
        })
        .catch(err=>res.status(404).json({error:"failed to add user"}))

});

// DELETING A USER
app.delete('/:id',(req,res)=>{
    const id=req.params.id;
    patients.destroy({
        where:{id:id}
    })
    .then((result)=>{
        res.redirect('/users')
    }).catch(err=>console.log(err))
})

// UPDATIN A USER
app.put('/users/:id',(req,res)=>{
    const id=req.params.id;
    const {firstname,lastname,nationality,age}=req.body;
    patients.findOne({where:{id:id}})
    .then((newPatient)=>{
        newPatient.firstname=firstname,
        newPatient.lastname=lastname,
        newPatient.nationality=nationality,
        newPatient.age=age

        newPatient.save();
        res.redirect('/users');

    }).catch(err=>console.log(err))
})

// UPDATING PATIENT PAGE
app.get('/users/:id',(req,res)=>{
    const id=req.params.id;
    patients.findOne({where:{id:id}})
    .then((results)=>{
        res.render('edit',{patient:results})
    })
})
// GET ADDING PAGE
app.get('/add',(req,res)=>{
    res.render('add')
})

// READING ALL USERS 
app.get('/users',(req,res)=>{
    patients.findAll()
        .then((results)=>{
            res.render('index',{patients:results})
        })
        .catch((err)=>console.log(err))
})


