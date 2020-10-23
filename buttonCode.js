const count = document.getElementById('count')

document.addEventListener('click', event => {
   if(event.target.id === 'sub')updateCount(-1)
   if(event.target.id === 'sub')updateIngredients('sub')
   if(event.target.id === 'add')updateCount(1)
   if(event.target.id === 'add')updateIngredients('add')
})

const updateIngredients = (sign) => {
   var ul = document.getElementById("Ingredients");
   var ilist = ul.getElementsByTagName("li");

   for(var i = 0; i < ilist.length; ++i){
      var item = ilist[i].innerHTML;
      var num = parseFloat(item.match(/[\d.]+/));
      if(sign === 'add') ilist[i].innerHTML = (parseFloat(item.match(/[\d.]+/))/+(count.innerText) + num).toFixed(2) + item.substring(item.indexOf(" "));
      if(sign === 'sub') ilist[i].innerHTML = (num - parseFloat(item.match(/[+-]?\d+(?:\.\d+)?/g))/+(count.innerText)).toFixed(2) + item.substring(item.indexOf(" "));
   }
}

const updateCount = dir => {
   count.innerText = +(count.innerText) + dir
   if(count.innerText < 0){
      count.innerText = 0
   }
}
 