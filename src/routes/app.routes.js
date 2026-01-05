import express from 'express';

import multer from 'multer';
import { getEventByIdController } from '../controllors/getEvents.controller.js'
import { saveUserController,updateUser } from '../controllors/saveAndUpdate.Controller.js';    
import { deleteEvent } from '../controllors/deleteEvent.controller.js';
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();


router.get('/events',getEventByIdController);


router.post('/events', upload.array('image'),saveUserController);

router.put('/events/:id',updateUser)

router.delete('/events/:id',deleteEvent)
export { router };
