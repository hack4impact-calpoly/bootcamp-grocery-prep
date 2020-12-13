import fs from 'fs';
import MongooseConector from './db.js';

async function insertDataIntoDB(filename) {
  console.log(filename);
  const rawdata = fs.readFileSync(filename);
  const recipe = JSON.parse(rawdata);
  return await MongooseConector.insertRecipe(recipe);
}

(async () => {
  try {
    await MongooseConector.connect();

    for (let i = 2; i < process.argv.length; i++) {
      const successful = await insertDataIntoDB(process.argv[i]);
      if (!successful) {
        console.log(`Uh oh... insertion of ${process.argv[i]} didn't go right... exiting`);
        await MongooseConector.disconnect();
        process.exit(1);
      }
    }

    await MongooseConector.disconnect();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
