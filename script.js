const tempField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField =document.querySelector("#search");
const form =document.querySelector("form");

const DEFAULT_TARGET="Noida";

form.addEventListener("submit",search);

fetchData(DEFAULT_TARGET);

function updateDOM(temperature,city,time,emoji,condition){
    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = getDay(new Date(exactDate).getDay());
    
    tempField.innerText = temperature;
    cityField.innerText = city;
    emojiField.src=emoji;
    weatherField.innerText =condition;
    dateField.innerText = `${exactTime} ${exactDay} ${exactDate}`;
}

async function fetchData(target){
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=f37e6d3463164ec8941113321231509&q=${target}`
        const response = await fetch(url);
        const data = await response.json();
        
        //Destructuring
        const {
            current:{ temp_c,condition:{text,icon} },
            location:{ name,localtime } 
            } = data;
        updateDOM(temp_c,name,localtime,icon,text); 
    } 
    catch (error) {
        alert("Location not found");    
    }
}
function search(e){
    e.preventDefault();
    let searchTarget = searchField.value;
    fetchData(searchTarget);
}

function getDay(day){
    switch (day) {
        case 0:
            return "Sunday"
         case 1:
            return "Monday"
         case 2:
            return "Tuesday"
         case 3:
            return "Wednesday";
         case 4:
            return "Thursday";
         case 5:
            return "Friday";
         case 6:
            return "Saturday";
        
        default:
            return "Not found" ;
    }
}
