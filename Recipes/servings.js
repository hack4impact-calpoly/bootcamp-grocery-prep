

const count = document.getElementById('count')

//If loaded for Hummus
if (typeof chickpeas !== 'undefined'){
  const chickpeas = document.getElementById('chickpeas')
  const tahini = document.getElementById('tahini')
  const lemon = document.getElementById('lemon')
  const garlic = document.getElementById('garlic')
  const oliveoil = document.getElementById('oliveoil')
  const salt = document.getElementById('salt')
  const water = document.getElementById('water')
}

//If loaded for Fried Rice
if (typeof oil !== 'undefined'){
  const oil = document.getElementById('oil')
  const rice = document.getElementById('rice')
  const veggies = document.getElementById('veggies')
  const eggs = document.getElementById('eggs')
  const soy = document.getElementById('soy')
}

//If loaded for Grilled Cheese
if (typeof bread !== 'undefined'){
  const bread = document.getElementById('bread')
  const butter = document.getElementById('butter')
  const cheddar = document.getElementById('cheddar')
}

//If loaded for Cookies
if (typeof brownsugar !== 'undefined'){
  const butter = document.getElementById('butter')
  const sugar = document.getElementById('sugar')
  const brownsugar = document.getElementById('brownsugar')
  const vanilla = document.getElementById('vanilla')
  const eggs = document.getElementById('eggs')
  const flour = document.getElementById('flour')
  const bakingsoda = document.getElementById('bakingsoda')
  const salt = document.getElementById('salt')
  const chocolate = document.getElementById('chocolate')
}

document.addEventListener('click', event => {
    if (event.target.id === 'sub') updateCount(-1)
    if (event.target.id === 'add') updateCount(1)
})

const updateCount = dir => {
  count.innerText = +(count.innerText) + dir

  //If loaded for Hummus
  if (typeof chickpeas !== 'undefined'){
    chickpeas.innerText = count.innerText * 1
    tahini.innerText = count.innerText * 0.25
    lemon.innerText = count.innerText * 1
    garlic.innerText = count.innerText * 1
    oliveoil.innerText = count.innerText * 2
    salt.innerText = count.innerText * 0.5
    water.innerText = count.innerText * 2
  }

  //If loaded for Fried Rice
  if (typeof oil !== 'undefined'){
    oil.innerText = count.innerText * 0.5
    rice.innerText = count.innerText * 1
    veggies.innerText = count.innerText * 0.5
    eggs.innerText = count.innerText * 2
    soy.innerText = count.innerText * 1
  }

  //If loaded for Grilled Cheese
  if (typeof bread !== 'undefined'){
    bread.innerText = count.innerText * 2
    butter.innerText = count.innerText * 3
    cheddar.innerText = count.innerText * 1
  }

  //If loaded for Cookies
  if (typeof brownsugar !== 'undefined'){
    butter.innerText = count.innerText * 0.5
    sugar.innerText = count.innerText * 0.5
    brownsugar.innerText = count.innerText * 0.25
    vanilla.innerText = count.innerText * 2
    eggs.innerText = count.innerText * 1
    flour.innerText = count.innerText * 1.75
    bakingsoda.innerText = count.innerText * 0.5
    salt.innerText = count.innerText * 0.5
    chocolate.innerText = count.innerText * 1
  }
}
