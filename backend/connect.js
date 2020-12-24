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

        const col = db.collection("recipes")

        let personDocument = {

            "title": "Vanilla Cinnamon Milk",
            //required: true,
            "desc": "I'm sorry",
            "picture": "images/vanilla.png",
            "ratings": [],
            "servings": 1,
            "ingredients":{
                "Vanilla Extracts": 2,
                "Strawberry JamGround Cinnamon": 1,
                "Milk": 1,
                "Jars": 1
            },
            "instructions": "Enjoy!" 

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