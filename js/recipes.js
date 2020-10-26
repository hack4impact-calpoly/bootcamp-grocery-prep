let ingredientCount;
let servingCount;
let originalIngredientCount;

const parseIngredientCount = (count) => {
    if((count.innerText.search('/') !== -1)
        && (count.innerText.search(' ') !== -1)) {
        const arr = count.innerText.split('/');
        const arr2 = arr[0].split(' ');
        return parseFloat(arr2[0]) + (arr2[1]/arr[1]);
    }
    else if((count.innerText.search('/') !== -1)) {
        const arr = count.innerText.split('/');
        return (arr[0]/arr[1]);
    }
    else {
        return parseFloat(count.innerText);
    }

}

const initializeOriginalIngredientCount = async ()  => {
    ingredientCount = document.getElementsByClassName('count');
    servingCount = document.getElementById('serving-count');
    originalIngredientCount =  Array.from(ingredientCount).map(item => {
            if(servingCount.innerText == 1) {
                return parseIngredientCount(item);
            }
            else {
                return (parseIngredientCount(item) / parseFloat(servingCount.innerText));
            }
    });
}

const updateIngredientCount = async (count) => {
    try {
        for(let i = 0; i < ingredientCount.length; i++) {
            ingredientCount[i].innerText = parseFloat(originalIngredientCount[i] * count);
        }
    } catch (err) {
        console.error(err);
    }
}

const updateServingCount = async (count) => {

    try {
        await initializeOriginalIngredientCount();
        servingCount.innerText = (parseInt(servingCount.innerText) + count).toString();
        await updateIngredientCount(parseInt(servingCount.innerText));
    } catch (err) {
        console.errror(err);
    }
}


const listenToServingCount  = async () => {
    try {
        document.addEventListener('click', event => {
            if(event.target.id === 'increment') {
                    updateServingCount(1);
            }
            if(event.target.id === 'decrement') {
                servingCount = document.getElementById('serving-count');
                if(servingCount.innerText > 1) {
                    updateServingCount(-1);
                }
            }
        })
    } catch (err) {
        console.error(err);
    }
}

listenToServingCount();
