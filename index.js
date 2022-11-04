const express=require('express');
const app=express();
const helmet=require('helmet');
const morgan=require('morgan');
const bodyParser=require('body-parser');
require('dotenv').config();
const methodOverride=require('method-override');
const {sequelize,users,departments,roles}=require('./models');
const port=5000;

// connecting mongodb database 
sequelize.authenticate()
    .then(()=>{
        console.log('connected to the deptuser database');
        app.listen(port,()=>{
            console.log('listening to requests on port http://localhost:'+port)
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


app.get('/users',async(req,res)=>{
    try {
        const depts=await departments.findAll();
        const user=await users.findAll();
        // const role=await roles.findAll();
        res.render('users',{depts,user});
    } catch (error) {
        console.log(error)
    }
})

app.post('/users',async(req,res)=>{
    const {deptid,username,roleid}=req.body;
    try {
        const dept=await departments.findOne({where:{id:deptid}})
        const role=await roles.findOne({where:{id:roleid}})
        const user=await users.create({username,deptid:dept.id,roleid:role.id})

        // res.redirect('/users')
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
    }

})

app.get('/dept',async(req,res)=>{
    try {
        const depts=await departments.findAll()
        res.render('dept',{depts})
    } catch (error) {
        console.log(error)
    }
})

app.post('/dept',async(req,res)=>{
    const {deptname}=req.body;
    try {
        const dept=await departments.create({deptname});
        if(dept){
            res.redirect('/dept')
        }        
    } catch (error) {
        console.log(error)
    }

})



// roles
app.get('/roles',async(req,res)=>{
    try {
        const rol=await roles.findAll();
        res.render('roles')
    } catch (error) {
        res.status(400).json(error)
    }
})


app.post('/roles',async(req,res)=>{
    const {rolename}=req.body;
    try {
        
    } catch (error) {
        res.status(400).json(error)
    }
})