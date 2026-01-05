import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI
const client = new MongoClient(uri);

let db;

export async function connectToDatabase() {

    if (!db) {
        try {
            await client.connect();
            db = client.db(); // Use the database specified in the URI
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    }
    return db;
}


