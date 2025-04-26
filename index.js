const express = require ('express');
const User = require ('./model');
const app = express();
const path = require('path');

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true})); 
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.render("index")
});

app.post('/create',async (req,res)=>{
 let { name,email,image} = req.body; 
  let createdUser = await User.create({
    name,
    email,
    image,
});
res.redirect('/read')

  
});

app.get('/read',async (req,res)=>{

 let allusers = await  User.find();   
res.render("read" ,{User : allusers});
});

app.get('/delete/:id' ,async (req,res) => {
   let user = await User.findOneAndDelete ({ _id: req.params.id});
    res.redirect('/read');
});



app.get('/edit/:id', async (req,res) =>{
  let user = await User.findOne({_id : req.params.id})

  res.render("edit" , {User})
});

app.post('/update/:id', async (req, res) => {
  let { name, email, image } = req.body;
  let updated = await User.findOneAndUpdate(
    { _id: req.params.id },
    { name, email, image },
    { new: true }
  );
  res.redirect('/read');
});
  

app.listen(3000)






