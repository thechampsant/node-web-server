const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
    var now = new Date().toDateString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('serverLog',log +'\n',(err)=>{
        if(err){
            console.log(err);
        }
    });
    next();
})

app.use((req,res,next)=>{
    res.render('maintain',{
        headName: 'This Page is under maintenace',
        pName: 'This is the paragraph of the page'
    });
   
});

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear(); 
});

hbs.registerHelper('screamIt',(text)=>{
   return text.toUpperCase(); 
});

app.get('/',(req,res)=>{
    //res.send('<h1>Hello Express!</h1>');
    res.send({
        name: 'Santosh',
        likes: [
            'Biking',
            'Coding',
            'Drinking'
        ]
    });
});

app.get('/about',(req,res)=>{
   res.render('about.hbs',{
       pageTitle: 'Santosh Page',
       someMessage: 'scream',
       currentYear: new Date().getFullYear()
   });
});

app.get('/bad',(req,res)=>{
    res.send({
        status: 'Bad request',
        check:[
            'Internet',
            'Unable to connect to the server'
        ]
    });
})
app.listen(3000,()=>{
    console.log('server is up on port 3000');
});