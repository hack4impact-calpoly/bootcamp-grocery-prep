const getCurrentServingSize = () => {
    return +(document.getElementById('serving-size').innerHTML);
}

const setServingSize = (n) => {
    document.getElementById('serving-size').innerHTML = n;
}

const isNumeric = (str) => {
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

const calcIfFraction = (str) => {
    if (str.includes('/')) {
        const divSplit = str.split('/');
        if (divSplit.length == 2 && isNumeric(divSplit[0]) && isNumeric(divSplit[1])) {
            return (+(divSplit[0])) / (+(divSplit[1]));
        }
    }

    return null;
}

const setNewIngredients = (oldSize, newSize) => {
    const ingredientsEle = document.getElementById('ingredients');
    for (const liEle of ingredientsEle.children) {
        const splitInnerHTML = liEle.innerHTML.split(' ');
        const expectedNumber = splitInnerHTML[0];
        const fractionValue = calcIfFraction(expectedNumber);
        if (isNumeric(expectedNumber) || fractionValue !== null) {
            const unitServingSize = (fractionValue !== null ? fractionValue : +expectedNumber) / oldSize;
            liEle.innerHTML = `${(unitServingSize * newSize)} ${splitInnerHTML.slice(1).join(' ')}`;
        }
    }
}

document.getElementById('decrement-serving').addEventListener('click', () => {
    const currServingSize = getCurrentServingSize();
    if (currServingSize > 1) {
        setNewIngredients(currServingSize, currServingSize - 1);
        setServingSize(currServingSize - 1);
    }
});
document.getElementById('increment-serving').addEventListener('click', () => {
    const currServingSize = getCurrentServingSize();
    setNewIngredients(currServingSize, currServingSize + 1);
    setServingSize(currServingSize + 1);
});
