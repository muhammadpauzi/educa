import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import flash from 'connect-flash';
import * as exphbs from 'express-handlebars';
import { initPassport } from './configs/passport.config';
import methodOverride from 'method-override';
import handleBarsHelpers from './helpers/handlebars.helper';

// routes
import { dashboardRouter, authRouter, classesRouter, studentsRouter } from './routes';

dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 5000;
const viewInstance = exphbs.create({ defaultLayout: 'main', extname: '.hbs', helpers: handleBarsHelpers });

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

// request body
app.use(express.urlencoded({ extended: true }));

// method override
app.use(methodOverride(function (req: Request, res: Response) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}));

// routes
app.use('/', authRouter);
app.use('/', dashboardRouter);
app.use('/classes', classesRouter);
app.use('/students', studentsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})