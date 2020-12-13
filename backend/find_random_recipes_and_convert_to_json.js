import { assert } from 'console';
import fs from 'fs';
import fetch from 'node-fetch';

if (process.argv.length !== 3) {
    console.log('Usage: node find_random_recupes_and_convert_to_json.js <num of recipes>');
    process.exit(1);
}

const randomRecipesToFind = process.argv[2];

async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}   

(async function () {
    async function findAndCreateJSONFile() {
        try {
            const response = await fetch('https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe');
            if (!response.ok) {
                console.log(response);
                process.exit(1);
            }
            const randomRecipe = await response.json();
            const filename = `./json_recipes/${randomRecipe.title.toLowerCase().replace(/ /g, '_').replace(/,/g, '')}.json`;
            if (fs.existsSync(filename)) {
                console.log(`${filename} already exists so skipping it...`);
            } else {
                console.log(`Creating new file: ${filename}`);
                fs.writeFileSync(filename, JSON.stringify(randomRecipe));
            }
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    }

    for (let i = 0; i < randomRecipesToFind; i++) {
        await findAndCreateJSONFile();
        await sleep(500);
    }
})();