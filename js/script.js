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
     var material = items[i].innerHTML;
     var num = parseFloat(material.match(/[\d.]+/)) ;
     if (sign === 'add') items[i].innerHTML = (parseFloat(material.match(/[\d.]+/))/+(count.innerText) + num).toFixed(2) + material.substring(material.indexOf(" "));
     if (sign === 'sub') items[i].innerHTML = (num - parseFloat(material.match(/[+-]?\d+(?:\.\d+)?/g))/+(count.innerText)).toFixed(2) + material.substring(material.indexOf(" "));
  }
}

const updateCount = dir => {
   count.innerText = +(count.innerText) + dir
}

