const serving = document.getElementById("serving")

document.addEventListener('click', event => {
   if (event.target.id === 'minus' && serving.innerText > 1) changeServing(-1)
   if (event.target.id === 'plus') changeServing(1)
})

const changeServing = (dir) => {
   const currentServ = +(serving.innerText)
   const newServ = currentServ + dir
   serving.innerText = +(serving.innerText) + dir
   let elements = document.getElementsByClassName("currServ")
   for (let i = 0; i < elements.length; i++) {
      elements[i].innerText = (+(elements[i].innerText) / currentServ) * (newServ)
   }  
}


