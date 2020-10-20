const URL = 'https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe';
const getHashes = window.location.hash.substring(1);
const getP = "?id="+getHashes; // getHashes ==! undefined ? '?id=' + getHashes : null;
baseServe = 1;

fetch(URL + getP)
.then(response => response.json())
.then(data => {
    console.log('data: ' + data);
    document.location.hash = data._id;

    document.getElementById('title').innerText = data.title;
    document.getElementById('recipeImage').src = data.picture;
    document.getElementById('portion').innerText = data.servings;

    getAvg = calcAverage(data.ratings);
    console.log(getAvg);

    for (i = 0; i < getAvg; i++){
        console.log("star1");
        star1 = document.createElement("span")
        star1.setAttribute('class', "fa fa-star checked");
        document.getElementById('rating').appendChild(star1);
    }
    for (i = 0; i < (5-getAvg); i++){
        console.log("star2");
        star2 = document.createElement("span")
        star2.setAttribute('class', "fa fa-star blank");
        document.getElementById('rating').appendChild(star2);
    }

    baseServe = data.servings;
    i = 0;
    ingredNums = [];
    for (const [key, value] of Object.entries(data.ingredients)){
        divContainer = document.createElement('div');
        //divContainer.setAttribute('style', 'background-color: #ff'+i*4+";");
        ol = document.createElement('ol')
        txt = document.createTextNode(key);
        span = document.createElement('span');
        span.setAttribute('class', 'num');
        span.innerHTML = value;
        ingredNums.push(value);
        i += 1;

        ol.appendChild(span);
        ol.appendChild(txt);
        divContainer.appendChild(ol);
        span.setAttribute('style', 'margin-right: 10px;');
        //divContainer.setAttribute('style', 'display: inline-block;');
        document.getElementById('ingredients').setAttribute('style', 'display: block;');
        document.getElementById('ingredients').appendChild(divContainer);
    }

    data.instructions.forEach((item, index) => {
        ol = document.createElement('ol');
        ol.innerHTML = 'Step ' + (index+1) + '<br>'
        ol.setAttribute('style', 'font-size: 32px; font-weight: 250;');
        ol2 = document.createElement('ol');
        ol2.innerHTML = item;
        ol2.setAttribute('style', 'font-weight: 150;');
        
        document.getElementById('instructions').appendChild(ol);
        document.getElementById('instructions').appendChild(ol2);
    });
})

function changePortionsPlus(){
    getPortion = parseInt(document.getElementById("portion").innerText);
    document.getElementById("portion").innerHTML = getPortion + 1;
    console.log(getPortion);

    listNums = document.getElementsByClassName("num");
    for (i = 0; i < listNums.length; i++){
        getNum = parseInt(listNums[i].innerText);
        getMultiplier = Math.floor((getPortion + 1) / baseServe);
        if (getMultiplier !== 0){
            listNums[i].innerHTML = ingredNums[i] * getMultiplier;
        }
    }
}

function changePortionsMinus(){
    getPortion = parseInt(document.getElementById("portion").innerText);
    if (getPortion > 1){
        document.getElementById("portion").innerHTML = getPortion - 1;

        listNums = document.getElementsByClassName("num");
        for (i = 0; i < listNums.length; i++){
            getNum = parseInt(listNums[i].innerText);
            getMultiplier = Math.ceil((getPortion - 1) / baseServe);
            listNums[i].innerHTML = ingredNums[i] * getMultiplier;
        }
    }
}

function calcAverage(ratings){
    finalRating = 0;
    ratings.forEach((rate)=>{
        finalRating += +(rate);
    });
    return Math.floor(finalRating / ratings.length);
}
