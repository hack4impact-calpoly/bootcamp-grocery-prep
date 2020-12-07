
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(express.static('../frontend'));

app.use((req, res, next) => {
    bodyParser.json()(req, res, err => {
        if (err) {
            console.log('Bad JSON formatting for body');
            return res.sendStatus(400); // Bad request
        }

        next();
    });
});

app.get('/api/recipe', (req, res) => {
    console.log('list of recipes requested');
    res.status(200).json({
        message: 'Recipes...',
    });
});

app.get('/api/recipe/:name', (req, res) => {
    console.log(`instructions for ${req.params.name} requested`);
    res.status(200).json({
        message: `Sending back recipes for ${req.params.name}...`,
    });
});

app.post('/api/rating', (req, res, next) => {
    const rating = req.body.rating;
    const id = req.body.id;
    if (!rating || !id) {
        res.status(400).json({
            message: 'Rating or id is not given',
        });
        return next();
    } else if (rating > 5 || rating < 1 || !Number.isInteger(rating)) {
        res.status(400).json({
            message: 'Rating must between 1 and 5 and a valid natural',
        });
        return next();
    }

    console.log(`rating of ${rating} received for recipe ${id}`);
    res.status(200).json({
        message: `Successfully posted ${rating} for recipe ${id}`,
    });
});

app.listen(3000);
