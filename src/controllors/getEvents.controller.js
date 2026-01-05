import { connectToDatabase } from '../lib/mongodb.js'
import { ObjectId } from 'mongodb';
export async function getEventByIdController(req, res) {
  const { id, type, limit, page } = req.query;

  if (id) {
    // Fetch single event by ID
    try {
      const database = await connectToDatabase();
      const collection = database.collection('events');
      const event = await collection.findOne({ _id: new ObjectId(id) }, { projection: { images: 0 } });

      if (event) {

        return res.json(event);
      } else {
        return res.status(404).json({ error: 'Event not found' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }


  } else if (type || limit || page) {
    // Handle list/filter events
    try {
      const filters = {};
      if (type) filters.type = type;
      const limitNum = limit ? parseInt(limit) : 10;
      const pageNum = page ? parseInt(page) : 1;
      const database = await connectToDatabase();
      const collection = database.collection('events');

      const query = { schedule: -1 };


      const skip = (pageNum - 1) * limitNum;
      const events = await collection.find({}, {
        projection: {
          images: 0
        }
      }).sort(query).skip(skip).limit(limitNum).toArray();


      return res.json(events);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.status(400).json({ error: 'Missing required query parameters: id or type/limit/page' });
  }
}