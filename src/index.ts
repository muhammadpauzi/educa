import express, { Application } from 'express';
import dotenv from 'dotenv';
import * as exphbs from 'express-handlebars';

// routes
import { dashboardRouter, authRouter } from './routes';

dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 5000;
const viewInstance = exphbs.create({ defaultLayout: 'main', extname: '.hbs' });

// handlebars
app.engine('.hbs', viewInstance.engine);
app.set('view engine', '.hbs');

// static
app.use(express.static('public'));

// routes
app.use('/', authRouter);
app.use('/', dashboardRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})