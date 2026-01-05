import { connectToDatabase } from '../lib/mongodb.js'
import { ObjectId } from 'mongodb';

export async function deleteEvent(req, res) {
    try {
        console.log("hi")
        const { id } = req.params
        const db = await connectToDatabase();
        const collection = db.collection("events")
        const isexist = await collection.findOne({ _id: new ObjectId(id) })

        if (!isexist) {
            return res.status(404).json(
                { message: "no event found" }
            )

        }
        const result = await collection.deleteOne({ _id: new ObjectId(id) })
        if (!result.acknowledged) {
            return res.status(500).json({ message: "internal server error" })
        }
res.status(200).json({
    message:"succesfully deleted "
})

    } catch (error) {
        console.error('delete error :', error)
        throw error;
    }

}