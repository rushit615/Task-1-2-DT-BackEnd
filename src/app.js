import express from 'express';
import multer from 'multer';
const app = express();


app.use(express.json());


import { router as appRoutes } from './routes/app.routes.js';
app.use('/api/v3/app', appRoutes);

export default app;