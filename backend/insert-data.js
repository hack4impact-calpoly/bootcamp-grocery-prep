const { MongoClient } = require("mongodb");

const url = "mongodb+srv://chef:recipe@cluster0.lxz00.mongodb.net/recipedb?retryWrites=true&w=majority";

const client = new MongoClient(url);

const dbName = "recipedb";
                 
 async function run() {

    try {

         await client.connect();

         console.log("Connected correctly to server");

         const db = client.db(dbName);

         const col = db.collection("allrecipes");

         // Construct a document                                                                                                                                                              

        //  let yogurt = {
        //     "title": "Instant Pot Yogurt",
        //     "meal": "breakfast",
        //     "desc": "Tastes almost as good as Ellenos and it's like sourdough because you keep the yogurt starter going but it's less work than sourdough",
        //     "picture": "../public/images/yogurt.jpg",
        //     "ratings": [5, 4, 4],
        //     "servings": 10,
        //     "ingredients": {
        //       "ounces Ultra Pasteurized/Ultra-Filtered Milk ": 52,
        //       "tablespoons of yogurt": 2,
        //       "cup Mixed berries of your choice": 1,
        //       "tsp Vanilla Extract": 2
        //     },
        //     "instructions": ["Santize hand mixer beaters in Instant Pot bowl with boiling water using the boil setting then pour out water",
        //         "Put milk and yogurt into instant pot and mix with a hand mixer until well blended.",
        //         "Place lid on Instant Pot and select the 'normal' yogurt setting",
        //         "Let incubate for 6-8 hours (the longer you go the more tangy it becomes)",
        //         "Scoop yogurt into a strainer and let sit in the fridge overnight so it becomes Greek yogurt",
        //         "Once strained and chilled, discard strained whey and transfer to a bowl.",
        //         "Use a hand mixer to blend berries, vanilla, and stevia/sweetener in with the yogurt",
        //         "Enjoy or store in the fridge for 10-14 days"
        //     ]
        //  }
        // let BananaPancakes = {
        //     "title": "Banana Pancakes",
        //     "meal": "breakfast",
        //     "desc": "♪ ♫ Pretend like it's the weekend now ♫ ♪",
        //     "picture": "../public/images/Pancake.jpg",
        //     "ratings": [5, 4],
        //     "servings": 4,
        //     "ingredients": {
        //         "cup oats": 0.5,
        //         "ripe banana": 1,
        //         "tsp baking powder": 1,
        //         "tbsp cinnamon": 1,
        //         "tbsp ground flax seed": 1,
        //         "cup chocolate chips": 0.33,
        //         "cup peanut butter powder or protein powder": 0.33,
        //         "tsp vanilla": 1,
        //         "cup egg whites": 1,
        //         "spray whipped cream": 1,
        //         "cup mixed berries": 0.33
        //     },
        //     "instructions": ["Grind the oats in a blender to make a fine flour texture",
        //     "Mash up the banana",
        //     "Mix together all the ingredients until smooth",
        //     "Heat a large non-stick skillet over medium heat",
        //     "Pour pancake batter in the pan to form small-medium sized pancakes. Cook for two minutes or until small bubbles begin to form on the top. Flip and cook for another two minutes or until golden brown and set through.",
        //     "Serve with whipped cream and berries"
        //     ]
        // }
        // let jorges = {
        //     "title": "Jorge's Chicken Soup Mexico City Style",
        //     "meal": "Dinner",
        //     "desc": "When I lived in CA, this is a recreation of my favorite meal from Jorge's Mexicatessen",
        //     "picture": "../public/images/Jorges.jpg",
        //     "ratings": [5, 4],
        //     "servings": 5,
        //     "ingredients": {
        //         "shredded chicken breasts or 1 shredded rotisserie chicken": 2,
        //         "oz chicken broth": 32,
        //         "diced onion": 0.5,
        //         "diced medium tomatoes": 2,
        //         "bunch chopped cilantro": 1,
        //         "tbsp Knorr tomato boullion with chicken flavor": 1,
        //         "jalapeño": 1,
        //         "avocado": 1
        //     },
        //     "instructions": ["Heat a large pot on medium heat and add chicken broth",
        //     "Dice up ingredients and spices other than avocado and add to the pot",
        //     "Simmer until flavor develops",
        //     "Pour into bowls to serve and top with avocado slices and cilantro"
        //     ]
        // }
        // let Ratatouille = {
        //     "title": "Ratatouille",
        //     "meal": "Dinner",
        //     "desc": "Easy and tasty",
        //     "picture": "../public/images/ratatouille.jpg",
        //     "ratings": [5, 4],
        //     "servings": 4,
        //     "ingredients": {
        //         "eggplants": 2,
        //         "zucchinis": 32,
        //         "jar marinara sauce": 0.66,
        //         "cup parmesean or mozarella cheese": 0.25,
        //         "bunch chopped basil": 0.5,
        //         "tsp oregano": 2,
        //         "Salt and pepper to taste": 1
        //     },
        //     "instructions": ["Preheat oven to 375°F",
        //     "Grease pan with olive oil",
        //     "Slice zucchini and eggplant thin with a mandolin",
        //     "Put a layer of zucchini and eggplant slices on the bottom of the pan",
        //     "Cover with marinara sauce, cheese, and basil",
        //     "Continue layering until pan is full",
        //     "Top with more basil, cheese, and oregano"
        //     ]
        // }
        // let Tamales = {
        //     "title": "Tamales",
        //     "meal": "Dinner",
        //     "desc": "Quinn family Christmas dinner. All seasonings are to taste",
        //     "picture": "../public/images/tamales.jpg",
        //     "ratings": [5, 4],
        //     "servings": 30,
        //     "ingredients": {
        //         "cups Masa Harina Corn Flour": 2,
        //         "tsp salt": 0.5,
        //         "cups warm water": 1.75,
        //         "corn husks": 30,
        //         "white onion": 1,
        //         "tbsp butter": 2,
        //         "cups shredded chicken or turkey": 1.5,
        //         "poblano pepper": 1,
        //         "habanero peppers": 2,
        //         "jalepeño peppers": 4,
        //         "cloves garlic": 4,
        //         "can sliced Black olives": 1,
        //         "1 bunch Cilantro": 1,
        //         "tsp chili powder": 1,
        //         "tsp oregano": 1,
        //         "tsp cumin": 1,
        //         "tsp salt": 1,
        //         "tsp pepper": 1,
        //         "tsp paprika": 1,
        //         "tsp cayenne pepper": 1,
        //         "tsp chipotle seasoning": 1
        //     },
        //     "instructions": ["Add warm water to masa flower and salt slowly while mixing until well combined",
        //     "Let dough sit covered for an hour",
        //     "Soak corn husks in warm water for 30 minutes until soft",
        //     "Cook onion in 2 tablespoons butter and ½ cup water until soft",
        //     "Add garlic, peppers, and spices to taste",
        //     "Let simmer for 3 minutes",
        //     "Mix in shredded meat and olives",
        //     "Remove from heat and mix in cilantro",
        //     "Lay a corn husk, glossy side up, on the counter with the wide end at the top",
        //     "Scoop about ¼ cup of dough onto the top, center of the corn husk",
        //     "Lay a piece of plastic wrap over the dough and use your hands to press and spread the masa into a thin layer, about 1/4 inch thick",
        //     "Place 1-2 tablespoons of filling in a line down the center of the dough",
        //     "Fold-in one long side of the husk over the filling, then fold the other long side, overlapping the first",
        //     "Fold the bottom of the husk upv",
        //     "Tear a long strip from an edge of one of the soaked corn husks and use it to tie the tamale, to hold it together",
        //     "In an Instant Pot, cook on Manual/High Pressure for 25 minutes. Allow pressure to naturally release for 10 minutes, and then quick release.",
        //     "Serve with salsa, guacamole, beans, and rice"
        //     ]
        // }
        // let boats = {
        //     "title": "Zucchini Boats",
        //     "meal": "Dinner",
        //     "desc": "Easy and tasty, and similar ingredients to ratatouille so it makes meal prep easy",
        //     "picture": "../public/images/zuchinni.jpg",
        //     "ratings": [5, 4],
        //     "servings": 1,
        //     "ingredients": {
        //         "zucchini": 1,
        //         "bell pepper": 0.5,
        //         "jar marinara sauce": 0.25,
        //         "oz shredded chicken or ground turkey": 3,
        //         "cup parmesean or mozarella cheese": 0.25,
        //         "cup diced onion": 0.25,
        //         "tsp minced garlic": 1,
        //         "bunch fresh basil": 0.5,
        //         "tsp salt": 0.5,
        //         "tsp pepper": 0.5,
        //         "tsp oregano": 1
        //     },
        //     "instructions": ["Preheat oven to 375°F",
        //     "Slice zucchini in half and scoop out middle",
        //     "Dice bell pepper and onion",
        //     "In a bowl, mix together scooped out zucchini, marinara sauce, meat, bell pepper, onion, cheese, salt, pepper, garlic, and oregano",
        //     "Fill hollow zucchini with mixture",
        //     "Top with more cheese and basil",
        //     "Put in oven for 25 minutes or microwave for 12 minutes until cheese is golden brown and zuchinni is tender"
        //     ]
        // }
        // let cake = {
        //     "title": "Midnight Chocolate Cake",
        //     "meal": "Dessert",
        //     "desc": "My family's go to recipe for birthdays, secret ingredient: coffee",
        //     "picture": "../public/images/cake.jpg",
        //     "ratings": [5, 4],
        //     "servings": 1,
        //     "ingredients": {
        //         "cup flour": 1,
        //         "cup sugar": 1,
        //         "cup unsweetened cocoa powder": 0.5,
        //         "tsp baking soda": 1,
        //         "cup milk": 0.5,
        //         "tsp vanilla": 1,
        //         "tsp baking powder": 0.5,
        //         "tsp salt": 0.5,
        //         "egg": 1,
        //         "cup black coffee": 0.25,
        //         "cup vegetable oil": 0.25,
        //     },
        //     "instructions": ["Preheat oven to 350°F",
        //     "Mix together flour, sugar, baking soda, baking powder, and salt",
        //     "Dissolve cocoa powder in hot black coffee",
        //     "Add milk to coffee mixture to cool down",
        //     "Mix liquid ingredients with dry ingredients until smooth",
        //     "Pour batter into buttered baking pan",
        //     "Bake at 350 degrees for 35 minutes"
        //     ]
        // }
        //  // Insert a single document, wait for promise so we can read it back
        //  await col.insertOne(yogurt);
        //  const p = await col.insertOne(BananaPancakes);
        //  await col.insertOne(jorges);
        //  await col.insertOne(Ratatouille);
        //  await col.insertOne(Tamales);
        //  await col.insertOne(boats);
        //  await col.insertOne(cake);

         // Find one document

         const myDoc = await col.findOne();

         // Print to the console

         console.log(myDoc);

        } catch (err) {

         console.log(err.stack);

     }
     finally {

        await client.close();

    }

}

run().catch(console.dir);