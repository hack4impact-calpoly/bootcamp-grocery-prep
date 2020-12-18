const url = "https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe"

const awaitFunction = async () => {
  let response = await fetch(url);
  if(response.ok){
    json = await response.json();
    document.getElementsByName('title')[0].innerHTML = json.title;
    document.getElementsByClassName('recipe_descrp')[0].innerHTML = json.desc;
    document.getElementsByTagName('img')[0].src = json.picture;
    ings = json.ingredients;
    for(let key in ings){
        const new_list_element = document.createElement('li');
        const list_span = document.createElement('span');
        list_span.className = 'num'
        new_list_element.appendChild(list_span);

        const number = document.createTextNode(ings[key])
        const ingredient_text = document.createTextNode(" " + key) 

        list_span.appendChild(number)
        new_list_element.appendChild(ingredient_text)

        document.getElementsByTagName('ul')[0].appendChild(new_list_element);

    }
    const instructions = json.instructions
    for(let key in instructions){
        const new_list_element = document.createElement('li');

        const text = document.createTextNode(instructions[key]) 

        new_list_element.appendChild(text)

        document.getElementsByTagName('ol')[0].appendChild(new_list_element);
    }
  }
  return false;
}
awaitFunction()