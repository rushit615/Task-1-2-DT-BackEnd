import { connectToDatabase } from '../lib/mongodb.js'
import { ObjectId } from 'mongodb';
export async function saveUserController(req, res) {
    try {
        const event = req.body;
        const files = req.files;
        console.log('Received files:', files);

        if (!event || typeof event !== 'object') {
            return res.status(400).json({ error: 'Invalid event data' });
        }


        if (files && files.length > 0) {
            event.images = files.map(file => ({
                filename: file.originalname,
                buffer: file.buffer,
                mimetype: file.mimetype
            }));
        }

        const db = await connectToDatabase();
        const collection = db.collection('events');
        const result = await collection.insertOne(event);

        res.json({
            message: 'Event saved successfully',
            eventId: result.insertedId
        });
    } catch (error) {
        console.error('Error saving event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function updateUser(req, res) {

    try{
    const { id } = req.params
    const db = await connectToDatabase();
    const collection = db.collection("events")

    const isexist = await collection.findOne({ _id: new ObjectId(id) })
    
    if (!isexist) {
        return res.status(404).json(
            { message: "no event found" }
        )
    }
    const result = await collection.updateOne(
        {
            _id: new ObjectId(id)
        },
        {
            $set: {
                ...req.body,
                updatedAt: new Date()
            }
        })
    if(!result.acknowledged){
        return res.status(500).json({message:"internal server error"})
    }

    res.status(200).json({
        message:"succefully put"
    })}catch(error){
        console.error(error)
        throw error;
    }

}