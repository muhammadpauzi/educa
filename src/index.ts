import express, { Application } from 'express';
import { join } from 'path';
import dotenv from 'dotenv';
import { engine as exphbs } from 'express-handlebars';

// routes
import { dashboardRouter, authRouter } from './routes';

dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 5000;

// handlebars
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// static
app.use(express.static(join(__dirname, 'public')));

// routes
app.use('/', authRouter);
app.use('/', dashboardRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})