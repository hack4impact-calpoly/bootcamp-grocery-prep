// JavaScript Document

const ss = document.getElementById('serving-size');
const q = document.getElementsByClassName("quantity");

document.addEventListener('click', event => {
	if (event.target.id === 'add') update(1)
	if (event.target.id === 'subtract') update(-1)
})

const update = (val) => {
	if(+(ss.innerHTML) + val >= 1){
		for(let i = 0; i < q.length; i++){
			q[i].innerHTML = +(q[i].innerHTML) + (+(q[i].innerHTML) / +(ss.innerHTML)) * val
		}
		ss.innerHTML = +(ss.innerHTML) + val
	} 
}
