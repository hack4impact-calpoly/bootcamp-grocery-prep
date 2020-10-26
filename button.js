
const servingCount = document.getElementById("serving-count");
const count = document.getElementsByClassName("count");


document.addEventListener('click', event => {

    if (event.target.id === 'dec'){
        updateServingCount(-1);
        updateCount(-1)}
    if (event.target.id === 'inc'){
        updateServingCount(1);
        updateCount(1)}
});


const updateServingCount = dir => {
    servingCount.innerText = +(servingCount.innerText) + dir
};

const updateCount = dir => {

    if (dir === -1){

        if (servingCount.innerHTML <= 0){
            for(let i=0, len=count.length; i<len; i++){
                count[i].innerText = count[i].innerText;
            }}
        else{
            for(let i=0, len=count.length; i<len; i++){
                let curr= parseFloat(count[i].innerHTML);
                let orig = parseFloat(servingCount.innerHTML)+1;
                count[i].innerText = (curr - (curr/orig)).toFixed(2);

        }}}

    else if (dir === 1){

        if (servingCount.innerHTML <= 1){
            for(let i=0, len=count.length; i<len; i++){
                count[i].innerText = count[i].innerText;
            }}
        else{
            for(let i=0; i<count.length; i++){
                let curr = parseFloat(count[i].innerHTML);
                let orig = parseFloat(servingCount.innerHTML)-1;
                count[i].innerText = (curr + (curr/orig)).toFixed(2);
        }}}
};

