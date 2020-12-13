import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// .env not in .gitignore so should be viewable
const url = `mongodb+srv://milestone4User:${process.env.DB_PASSWORD}@recipes.va72k.mongodb.net/testrecipes?retryWrites=true&w=majority`;

// Amount not required... if not provided then just don't display or process amount
const ingredientSchema = new mongoose.Schema({
    ingredient: { type: String, required: true },
    amount: { type: Number, required: false },
    _id: false,
});

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true, index: true, },
    desc: { type: String, required: true },
    picture: { type: String, required: true },
    ratings: { type: [{ type: Number, min: 1, max: 5 }], required: true },
    servings: { type: Number, min: 1, required: true },
    ingredients: { type: [ingredientSchema], required: true },
    instructions: { type: [String], required: true },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

async function setup(todo) {
    try {
        return todo();
    } catch (error) {
        console.log(error);
        return false;
    }
} 

const MongooseConnector = {
    connected: false,
    connect: async () => {
        // Copied
        if (!MongooseConnector.connected) {
            try {
                MongooseConnector.connected = true;
                await mongoose.connect(url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false,
                    useCreateIndex: true,
                    autoIndex: true,
                });
                await Recipe.init();
                console.log('Connected to MongoDB');
                return true;
            } catch (error) {
                console.log(error);
                MongooseConnector.connected = false;
                return false;
            }
        }
    },
    disconnect: async () => {
        if (MongooseConnector.connected) {
            try {
                await mongoose.disconnect();
                MongooseConnector.connected = false;
                console.log('Disconnected');
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    },
    insertRecipe: async (recipe) => {
        if (!MongooseConnector.connected) {
            return false;
        }
        if ('_id' in recipe) {
            delete recipe._id
        }
        for (let i = 0; i < recipe.ratings.length; i++) {
            if (typeof(recipe.ratings[i]) === 'string') {
                recipe.ratings[i] = +(recipe.ratings[i]);
            }
            // So validation works correctly
            if (recipe.ratings[i] === 0) {
                recipe.ratings[i] = 1;
            }
        }
        const convertedRecipeIngredients = [];
        for (const key in recipe.ingredients) {
            convertedRecipeIngredients.push({
                ingredient: key,
                amount: recipe.ingredients[key],
            });
        }
        recipe.ingredients = convertedRecipeIngredients;
        try {
            const newRecipe = new Recipe(recipe);
            // console.log(newRecipe);
            await newRecipe.save();
            console.log(`Successfully inserted ${recipe.title}`);
            return true;
        } catch (error) {
            if (error.name === 'MongoError' && error.code === 11000) {
                console.log(`Duplicate entry of ${recipe.title} so wasn't inserted`);
                return true;
            }
            console.log(error);
            return false;
        }
    },
    getAllRecipes: async () => {
        try {
            return await Recipe.find({}, '_id title');
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    getRecipeByName: async (name) => {
        return await setup(() => {
            return Recipe.findOne({ title: new RegExp(name, 'i') }).exec();
        });
    },
    addRating: async (id, rating) => {
        return await setup(() => {
            return Recipe.findOneAndUpdate(
                { _id: mongoose.Types.ObjectId(id) },
                { $push: { ratings: rating } },
            );
        });
    },
};

export default MongooseConnector;