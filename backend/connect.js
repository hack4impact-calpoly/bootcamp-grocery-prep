const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://bmcmann:H3ll0W0rld@bootcampc1.shnyh.mongodb.net/database?retryWrites=true&w=majority"
const client = new MongoClient(url);

const dbName = "database"
async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");

        const db = client.db(dbName)

        const col = db.collection("people")

        let personDocument = {

            "data": "Poggers, this is data #3"

        }

        const p = await col.insertOne(personDocument)

        const myDoc = await col.findOne()

        console.log(myDoc)
    

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);