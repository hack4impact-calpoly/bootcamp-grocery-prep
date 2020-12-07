#!/usr/bin/env python3

import re

class BasicRecipe:
    def __init__(self, filename, title, desc_txt, ingredients, instructions, serving_size, after = None):
        self.filename = filename
        self.title = title
        self.desc_txt = desc_txt
        self.ingredients = ingredients
        self.instructions = instructions
        self.after = after
        self.serving_size = serving_size
        assert(self.serving_size > 0)

file_contents = [
    BasicRecipe('avocado_toast', 'Avocado Toast',
        '''
        <p>Embrace your inner millienal with this quirky recipe</p>
        ''',
        '''
        <li>2 slices of bread</li>
        <li>1 avocado</li>
        <li>1 tbsp of pepper</li>
        ''',
        '''
        <li>Toast the bread</li>
        <li>Spread the insides of the avocado onto the bread</li>
        <li>Add pepper</li>
        ''', 2
    ),
    BasicRecipe('tacos', 'Tacos',
        '''
        <p>An absolute <strong>essential</strong> meal to have if it is Tuesday,
        or even if it's not.</p>
        <p>Goes great with <a href="salsa.html">salsa</a> or
        <a href="guac.html">guac</a>.<p>
        ''',
        '''
        <li>5 tortillas</li>
        <li>1 lb ground beef</li>
        <li>3 cups of shreded lettuce</li>
        <li>1 tomato</li>
        <li>1 handful of shredded cheese</li>
        <li>3 scoops of sour cream</li>
        ''',
        '''
        <li>Cook the ground beef</li>
        <li>Chop up the tomato</li>
        <li>Distrubute ingredients amongst tacos</li>
        ''', 2
    ),
    BasicRecipe('bfd', 'Breakfast for Dinner',
    '''
    <p>For when you're too lazy to really cook, but still want to have a complete meal</p>
    ''',
    '''
    <li>3 eggs</li>
      <li>1 cup of coffee (decaf)</li>
      <li>1 Jimmy Dean sausage</li>
      <li>1 slice of bread</li>
      <li>2 scoops of jam</li>
      <li>Salt and pepper</li>
    ''',
    '''
    <li>Cook the sausage</li>
      <li>Cook the eggs</li>
      <li>Add salt and pepper to taste</li>
      <li>Make the coffee using a Mr. Coffee</li>
      <li>Toast the bread</li>
      <li>Add jam to toast</li>
      ''', 1),
    BasicRecipe('brownies_and_icecream', 'Brownies and Ice Cream',
    '''
    <p>Desserts simply don't get better than this</p>
    ''',
    '''
    <li>1 bag of brownie mix</li>
      <li>3 eggs</li>
      <li>1/2 cup of vegetable oil</li>
      <li>1 pint of ice cream</li>
      ''',
    '''
    <li>Mix brownie mix, eggs, and vegetable oil</li>
      <li>Bake for 20 mins at 350</li>
      <li>Serve over ice cream</li>
    ''', 6
    ),
    BasicRecipe('guac', 'Guac',
    '''
    <p>Another lovely food to pair with <a href="tacos.html">tacos</a> 
          or <a href="salsa.html">salsa</a>.</p>
    ''',
    '''
    <li>2 avocados</li>
      <li>1 tomatoes</li>
      <li>1/2 onion</li>
      <li>1 clove of garlic</li>
      <li>1 lime</li>
      <li>1 tbsp of salt</li>
    ''',
    '''
    <li>Mash avocados in a large bowl</li>
      <li>Stir in chopped tomato and onion</li>
      <li>Mince garlic and add to bowl</li>
      <li>Juice lime and add to bowl</li>
      <li>Add salt</li>
      <li>Chill in fridge for half an hour</li>
      <li>Serve with chips</li>
    ''', 4),
    BasicRecipe('mac_and_cheese', 'Mac and Cheese',
    '''
    <p>A dish that has a place in everyone's heart</p>
    ''',
    '''
    <li>1 box of Kraft mac and cheese</li>
      <li>1/2 cup of milk</li>
      <li>2 tbsp of butter</li>
    ''',
    '''
    <li>Boil water and add mac and cheese</li>
      <li>Patiently wait for a couple of minutes</li>
      <li>Drain the water</li>
      <li>Add cheese powder, milk, and butter</li>
    ''', 2),
    BasicRecipe('oreos_and_milk', 'Oreos and Milk',
    '''
    <p>Quite possibly the easiest recipe on the entire site</p>
    ''',
    '''
    <li>12 oreos</li>
      <li>1 glass of milk</li>
    ''',
    '''
    <li>Dunk oreos in milk</li>
      <li>Let them soak for a while</li>
    ''', 1),
    BasicRecipe('salsa', 'Salsa',
    '''
    <p>Both a great snack, and something fun to pair with
      <a href="tacos.html">TACOS</a>!</p>
    ''',
    '''
    <li>4 tomatoes</li>
      <li>2 jalepenos</li>
      <li>1/2 onion</li>
      <li>1 lemon</li>
      <li>1 bunch of cilantro</li>
      <li>1 tbsp of salt</li>
    ''',
    '''
    <li>Chop up the tomatoes, jalepenos, onion, and cilantro
      and add to the blender</li>
      <li>Juice the lemon into the blender</li>
      <li>Add salt to the blender</li>
      <li>Blend until liquidy</li>
      <li>Serve with chips!</li>
    ''', 8),
    BasicRecipe('tuna_casserole', 'Tuna Casserole',
    '''
    <p>If you can get over your hatred of tuna, you will enjoy this one</p>
    ''',
    '''
    <li>1 can of tuna</li>
      <li>1 box of mac and cheese</li>
      <li>1 can of cream of mushroom soup</li>
      <li>1/2 cup of milk</li>
      <li>1 tbsp of butter</li>
      <li>6 cheese slices</li>
    ''',
    '''
    <li>Cook <a href="mac_and_cheese.html">mac and cheese</a> as normal</li>
      <li>Mix in cream of mushroom soup and tuna</li>
      <li>Put in a casserole dish and top with cheese slices</li>
      <li>Bake in oven at 350 for 25 minutes</li>
    ''', 6),
    BasicRecipe('tuna_salad', 'Tuna Salad',
    '''
    <p>Eat fish and a salad at the same time. It's tuna salad</p>
    ''',
    '''
    <li>1 can of tuna</li>
      <li>1 handful of spinach</li>
    ''',
    '''
    <li>Put spinach in a bowl</li>
      <li>Add tuna to the top of the spinach</li>
    ''', 2,
    '''
    <p>It's really that easy!</p>
    '''),
    BasicRecipe('turkey_sandwich', 'Turkey Sandwich',
    '''
    <p>The easiest, most reliable lunch you can imagine</p>
    ''',
    '''
    <li>2 slices of bread</li>
      <li>3 turkey slices</li>
      <li>1 slice of cheese</li>
      <li>4 scoops of mayo</li>
    ''',
    '''
    <li>Lather both slices of bread up with all the mayo</li>
      <li>Put some turkey and cheese on the mayo</li>
    ''', 1),
]

'''
    This is needed to replace multiline content with correct space amount.
    Not needed but cool
'''
def replace_line_content(line, insert_match, to):
    replacing_with = ''
    front_spaces = ' ' * (len(line) - len(line.lstrip()))
    replaced_line = line.replace(insert_match.group(1), to).strip()
    for replace_line in replaced_line.split('\n'):
        replacing_with += front_spaces + replace_line.strip() + '\n'
    return replacing_with

insert_regex = r'.*(!!INSERT_(.*)!!).*'

def generate_html_files(base_file):
    with open(base_file, 'r') as f:
        lines = f.readlines()
        for recipe in file_contents:
            recipe_file_contents = ''
            for line in lines:
                insert_match = re.match(insert_regex, line)
                if insert_match is not None:
                    if insert_match.group(2) == 'TITLE':
                        line = line.replace(insert_match.group(1), recipe.title)
                    elif insert_match.group(2) == 'DESC_TXT':
                        line = replace_line_content(line, insert_match, recipe.desc_txt)
                    elif insert_match.group(2) == 'INGREDIENTS':
                        line = replace_line_content(line, insert_match, recipe.ingredients)
                    elif insert_match.group(2) == 'INSTRUCTIONS':
                        line = replace_line_content(line, insert_match, recipe.instructions)
                    elif insert_match.group(2) == 'PIC_URL':
                        line = line.replace(insert_match.group(1), recipe.filename)
                    elif insert_match.group(2) == 'EXTRA_AFTER':
                        if recipe.after is not None:
                            line = replace_line_content(line, insert_match, recipe.after)
                        else:
                            line = ''
                    elif insert_match.group(2) == 'SERVING_SIZE':
                        line = line.replace(insert_match.group(1), str(recipe.serving_size))
                    else:
                        print('ERROR... invalid insert line {}'.format(line))
                recipe_file_contents += line

            with open('recipes/' + recipe.filename + '.html', 'w') as recipe_file:
                recipe_file.write(recipe_file_contents)



from sys import argv
if __name__ == "__main__":
    if len(argv) != 2:
        print("Usage: create_basic_recipes.py <base_file>")
        exit(1)
    generate_html_files(argv[1])
