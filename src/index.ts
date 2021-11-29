import express, { Application } from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import flash from 'connect-flash';
import * as exphbs from 'express-handlebars';
import { initPassport } from './configs/passport.config';

// routes
import { dashboardRouter, authRouter, classesRouter } from './routes';

dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 5000;
const viewInstance = exphbs.create({ defaultLayout: 'main', extname: '.hbs' });

// handlebars
app.engine('.hbs', viewInstance.engine);
app.set('view engine', '.hbs');

// session
app.use(session({
    secret: process.env.SECRET_SESSION || 'secret_123',
    resave: false,
    saveUninitialized: false,
}));

// flash
app.use(flash());

// init passport
initPassport(app);

// static
app.use(express.static('public'));

// routes
app.use('/', authRouter);
app.use('/', dashboardRouter);
app.use('/classes', classesRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})