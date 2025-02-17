const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://ayushhdhanush:XTsamVpJFHO8Zslk@cluster0.nmsux.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function testConnection() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log("✅ MongoDB Connected Successfully!");
        const databases = await client.db().admin().listDatabases();
        console.log("📂 Databases:", databases);
        await client.close();
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
    }
}

testConnection();