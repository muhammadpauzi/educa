import express, { Application } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})