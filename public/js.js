document.addEventListener('click', event  => {

  if(event.target.id === 'serving_button_minus')
  {
    // Getting the current serving number
    let serving_element = document.getElementsByClassName('current_serving')[0]
    // if its at one then don't update
    if(serving_element.innerHTML - 1 < 1)
    {
      serving_element.innerHTML = 1
    }
    else
    {
      // Since minus was hit subtract 1 from servings 
      serving_element.innerHTML -= 1
      // Grab all the numbers in the recipe
      let counts = document.getElementsByClassName('num')
      // Implement updating the recipe here
      for(i = 0; i < counts.length; i++){
        counts[i].innerHTML = parseFloat(counts[i].innerHTML) - parseFloat(counts[i].innerHTML)/(parseFloat(serving_element.innerHTML)+1)
        counts[i].innerHTML = Number.parseFloat(counts[i].innerHTML).toFixed(1)
      }
    }
  }
  else if(event.target.id === 'serving_button_plus')
  {
    // Getting the current serving number
    let serving_element = document.getElementsByClassName('current_serving')[0]  
    // Since plus was hit add 1 to servings   
    serving_element.innerHTML = parseInt(serving_element.innerHTML) + parseInt(1)    
    // Grab all the numbers in the recipe
    let counts = document.getElementsByClassName('num')
    // Implement updating the recipe here
    for(i = 0; i < counts.length; i++){
      // Update recipe
      counts[i].innerHTML = parseFloat(counts[i].innerHTML) + (parseFloat(counts[i].innerHTML)/(parseFloat(serving_element.innerHTML)-1))
      counts[i].innerHTML = Number.parseFloat(counts[i].innerHTML).toFixed(1)
    }
  }
  else if(event.target.id === 'submit_rating'){
    console.log('sumbit')
    const dropdown = document.getElementsByName('rating_numbers')[0]
    let selectedText = dropdown.options[dropdown.selectedIndex].text;
    const spefic_url = "https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe" + '?id=' + document.getElementsByName('title')[0].id
    post_ratings(selectedText, spefic_url)

    console.log(spefic_url)
  }
})

const post_ratings = async (rating, webiste) => {
  const data = {
    id: document.getElementsByName('title')[0].id,
    rating: parseInt(rating)
  };

  fetch(webiste, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  let response = await fetch(webiste);
  if(response.ok){
    json = await response.json();
    const ratings = json.ratings
    const rating_ele = document.getElementById('current_rating')
    let counter = 0;
    let total = 0;
    for(let key in ratings){
        counter++;
        total += parseInt(ratings[key]);
    }
    let avg = 0
    if(counter === 0){
        avg = "No ratings"
    }
    else{
        avg = total/counter;
    }
    rating_ele.innerHTML = Number.parseFloat(avg).toFixed(2)
  }
}
