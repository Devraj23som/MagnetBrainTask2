const { MongoClient } = require("mongodb");
import data from "../data"
const uri = "mongodb+srv://Devraj:thakurdev@cluster0.pinxr.mongodb.net/Ecom?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function uploadData() {
    try {
        await client.connect();
        const database = client.db("Ecom");
        const collection = database.collection("products");

        const result = await collection.insertMany(data);
        console.log(`${result.insertedCount} documents were inserted.`);
    } finally {
        await client.close();
    }
}

export default uploadData;