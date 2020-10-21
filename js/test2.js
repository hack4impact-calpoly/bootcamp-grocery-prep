const count = document.getElementById('count')

document.addEventListener('click', event => {
   if (event.target.id == 'sub')  if (count.innerText > 1) {
      handleIngredients('sub')
      updateCount(-1)
   }
   if (event.target.id == 'add') { 
      handleIngredients('add')
      updateCount(1)
   }
})

const handleIngredients = (sign)  => {
  var ul = document.getElementById("ingredients");
  var items = ul.getElementsByTagName("li");

  for (var i = 0; i < items.length; ++i) {
     var material = items[i];
     var num = +(material.innerHTML.match(/\d+/g));
     if (sign === 'add') items[i].innerHTML = +(material.innerHTML.match(/\d+/g))/+(count.innerText) + num + material.innerHTML.substring(1);
     if (sign === 'sub') items[i].innerHTML = num - +(material.innerHTML.match(/\d+/g))/+(count.innerText) + material.innerHTML.substring(1);
  }
}

const updateCount = dir => {
   count.innerText = +(count.innerText) + dir
}
   
