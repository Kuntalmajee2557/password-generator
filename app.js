const inputSlider = document.querySelector("[data-LengthSlider]");
const lengthDisplay = document.querySelector("[data-LengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelector("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password ="";
let passwordLength = 10;
let checkbox = 0;
handleSlider()
// set strength color to gray


// function
// copy content
// slider handle
// generate password
// set indicator = color and sadow
// get random integer
// get random uppercase
// get random lowercase
// get random symbol
// get random 


// set password length

function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}


function setIndicator(color){
    indicator.style.backgroundColor = color;

}

function getRandomInteger(min, max){
    let randomInteger =  Math.floor(math.random() * (max - min)) + min;
}

function generateRandomNumber(){
    return getRandomInteger(0,9);
}

function generateRandomLowerCase(){
    return String.fromCharCode(getRandomInteger(97, 123));
}

function generateRandomUpperCase(){
    return String.fromCharCode(getRandomInteger(65, 91));
}

function generateSymbol(){

    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength == 8){
        setIndicator("#0f0");
    }
    else if((hasUpper && hasLower) && (hasNum || hasSym) && passwordLength >= 6){
        setIndicator("#ff0")
    }
    else{
        setIndicator("#f00");
    }
}   

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(error){
        copyMsg.innerText = "Failed";
    }
    // to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    }, 2000);



}



function sufflePassword(array){
    // fisher Yates method 
    for(let i = array.length  - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[j];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    arr.forEach((el) => (str += el));
    return str;

}



function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked){
            checkCount++;
        }
    });

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }


}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
});




inputSlider.addEventListener("input", (e) => {
    passwordLength = e.target.value;
    handleSlider();
});



copyBtn.addEventListener("click", () => {
    if(passwordDisplay.value){
        copyContent();
    }
})



generateBtn.addEventListener('click', () => {
    // none of the checkbox are selected 
    if(checkCount <= 0) return;

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }


    // let start to find the password
    console.log("journey started");


    // remove old password
    password = "";



    // let's put the stuff by checkboxes
    // if(uppercaseCheck.checked){
    //     password += generateRandomUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password += generateRandomLowerCase();
    // }
    // if(numbersCheck.checked){
    //     password += generateRandomNumber();
    // }
    // if(symbolsCheck.checked){
    //     password += generateSymbol();
    // }
    let funcArr = [];
    if(uppercaseCheck.checked){
        funcArr.push(generateRandomUpperCase);
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateRandomLowerCase);
    }
    if(numbersCheck.checked){
        funcArr.push(generateRandomNumber);
    }
    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }

    // compalsary addition 
    for(let i = 0; i < funcArr.length; i++){
        password += funcArr[i]();
    }

    console.log("compalsary addition done");


    // remaining addition 
    for(let i = 0; i < passwordLength - funcArr.length; i++){
        let randIndex = getRandomInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }
    console.log("ramaining addition done");



    // suffle the password
    password = sufflePassword(Array.from(password));

    console.log("suffling done");



    // show in UI 
    passwordDisplay.value = password;
    console.log("UI addition done");


    calcStrength();
})







