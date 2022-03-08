const express = require('express');
const bodyparser = require('body-parser');
const userRoute = require('./server/api/user-route');
const routes = require('./server/routes/router');
const dotenv = require('dotenv');
const morgan = require('morgan');
const methodOverride = require('method-override');
const connectDb = require('./server/database/connection-db');

const app = express();

//setto utilizzo del file .env
dotenv.config({ path: '.env' });
const PORT = process.env.PORT || 8000;

//setto uso morgan
app.use(morgan('tiny'));

//utilizzo methodOverride per sovrascrivere i metodi http nella form
app.use(methodOverride('_method'));

//setto l' uso di bodyparser per dati form
app.use(bodyparser.urlencoded({ extended: true }));

// setto il view engine
app.set('view engine', 'ejs');

//mi connetto al database
connectDb();

//stabilisco l' uso di tutte le rotte API a partire da /api in userRoute
app.use('/api', userRoute);

//stabilisco l' uso delle rotte user a partire da /users
app.use('/users', routes);

app.get('/', (req, res) => res.render('home'));

//metto in ascolto il server sulla porta stabilita in .env
app.listen(PORT, () => console.log(`Server in ascolto sulla porta ${PORT}`));