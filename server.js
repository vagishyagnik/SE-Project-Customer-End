const exp = require('express');
const server = exp();
const session = require('express-session');
const { reservationInfo } = require('./db2');
const passport = require('./passport');

const root = require('./routes/root.js').route
const admin = require('./routes/admin').route
const cart = require('./routes/cart').route
const reservation= require('./routes/reservation').route
server.use(exp.json());
server.use(exp.urlencoded({extended:true}));

// server.use(passport.initialize());
// server.use(passport.session());



server.use(session({
    secret : 'whyudodis',
    resave: false,
    saveUninitialized: true,
}));

//Setting View Engine as HBS
server.set("view engine","hbs")

server.use(exp.static('public')); 

server.use('/root',root)
server.use('/admin',admin)
server.use('/cart',cart)
server.use('/reservation',reservation)

// //----------------------------------------------------Logout Handler-------------------------------------------//

server.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

// //--------------------------------------------------Error Page----------------------------------------------//
server.get("/*",(req,res)=>{
    res.render('errorPage')
})

server.listen(6979,()=>{
    console.log('Server started at http://localhost:6979');
})