let amounts = document.getElementsByClassName('amount')
let serving = document.getElementById('serving')


document.addEventListener('click',event =>{
    if(event.target.id === 'sub') sub(), updateCount(-1) 
    if(event.target.id === 'plus') add(), updateCount(1)
})

const updateCount = dir => {
    document.getElementById('serving').innerText = +(document.getElementById('serving').innerText) + dir
}

function add(){
for(let i = 0; i < amounts.length; i++){
    amounts[i].innerText = +(amounts[i].innerText) + +(amounts[i].innerText)/+(document.getElementById('serving').innerText)
    }
}

function sub(){
    for(let i = 0; i < amounts.length; i++){
        amounts[i].innerText = +(amounts[i].innerText) - +(amounts[i].innerText)/+(document.getElementById('serving').innerText)
        }
    }

