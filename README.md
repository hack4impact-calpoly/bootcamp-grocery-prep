# bootcamp-grocery-prep - bglossner
2020 bootcamp project

this repo will serve as a place to "turn in" your work. more info about bootcamp can be found on the [bootcamp resources notion page](https://www.notion.so/h4i/Bootcamp-Resources-995537643dec454099abd859d8c02643).

I got bored so I just downloaded the actual recipe HTML pages for the first part :)

Downloaded it all with:
`wget --mirror --no-parent http://v1.h4i.club.s3-website-us-west-2.amazonaws.com`

## Getting recipes programitically
`node backend/find_random_recipes_and_convert_to_json.js <num>` can be used to get `<num>` random recipes and convert (if not already found) them into JSON files in `json_recipes`.
I used 100 for the number and worked fine.
Any duplicates found (by filename) are just ignored

## Adding recipes to DB
`node backend/add_file_data_to_recipedb.js <files...>` can be used to convert JSON files into recipes and put them in Atlas DB with Mongoose.
I used it as `node backend/add_file_data_to_recipedb.js backend/json_recipes/*` to enter all the JSON files.
Any duplicates are caught as an error and ignored. Data entry of rest will continue

## Data transformations:
Ratings
- Value of 0 converted to 1
- Strings converted to numbers

\_id
- Value is removed. Need to allow mongoose driver to make this value

