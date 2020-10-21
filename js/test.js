const count = document.getElementById('count')

document.addEventListener('click', event => {
   if (event.target.id == 'sub') updateCount(-1)
})

const updateCount = dir => {
   count.innerText = +(count.innerText) + dir 
}

