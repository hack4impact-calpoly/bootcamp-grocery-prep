document.addEventListener('click', event  => {

  if(event.target.id === 'serving_button_minus')
  {
    console.log('click minus')
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
    console.log('click plus')
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
})
