const express = require('express');
const app = express();

const { check, validationResult } = require('express-validator/check');

// importa modulul body-parser pentru a gestiona requesturile POST
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

app.use(cookieParser());

// seteaza template engine-ul aplicatiei
app.set('view engine', 'ejs');

/*********   ddd
MIDDLEWARE
**********/

/**
 * Insereaza middleware-ul pentru parsarea requesturilor transmise prin formulare POST
 * Efect: pe obiectul req.body vor aparea perechile de chei/valori transmise prin formular
 */
app.use(bodyParser.urlencoded({extended: false}));

// seteaza directorul "/public" pentru a afisa asset-uri statice
app.use('/static', express.static('public'));

//middleware de test
app.use((req, res, next) => {
  res.mesaj = `Userul a venit de la adresa ${req.headers.referer}`;
  next();
});

/*********   
 RUTE
**********/

app.post('/hello', [    
  // password must be at least 5 chars long
  check('nume').isLength({ min: 3 }),
  // email must have a correct format
  check('email').isEmail().withMessage('nu e bun formatul de email!')
], 
(req, res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('pages/hello',{err:errors.mesaj});
  }
  res.cookie('firstkookie',req.body.nume);
  res.redirect('/');})
app.get('/', (req, res) => {  
  res.render('pages/index', { nume : req.cookies.firstkookie});
  
});

app.get('/New-page', (req, res) => {   
  res.render('pages/new-page');
});

app.get('/hello', (req, res) => {
  res.render('pages/hello');
});
app.post('/goodbye',(req,res)=>{
  res.clearCookie('firstkookie');
  res.redirect('/');
})


app.listen(5000, () => console.log(`Listening on port: 5000`));