//var content = document.getElementById("display");
var button = document.getElementById("random-button");
var nameBox = document.getElementById("name-box");
const imageUrl = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/"
var champInfos = {};
var lastNumber = null;

var globals = {
    champs: 0,
    version: 0,
};
const rollDelay = 100; //delay between roll animation
var i = 0;




document.addEventListener('DOMContentLoaded', function() {
    getVersion();
}, false);

function logConsole(responseData){
    console.log(responseData)
};

function setGlobals(index, responseData){
    globals[index] = responseData;
};


function getVersion(){
    $.getJSON('https://ddragon.leagueoflegends.com/api/versions.json', function(json) {
        setGlobals("version", json[0]); //most recent version has index of 0
        champsApiString = `https://ddragon.leagueoflegends.com/cdn/${json[0]}/data/en_US/champion.json`;
        getChampInfos(champsApiString);
    });
};

function getChampInfos(champsApiString){
    $.getJSON(champsApiString, function(json) {
        setGlobals("champs", Object.keys(json.data).length);
        champInfos = json.data;
    });
};

generateRandomNumber = function(){
    return Math.floor(Math.random() * globals["champs"]);
};
displayNumber = function() {
    lastNumber = generateRandomNumber();
    button.textContent = lastNumber;
};

function displayName(lastNumber) {
    nameBox.innerHTML = champInfos[Object.keys(champInfos)[lastNumber]].id;
    imageString = `images/${champInfos[Object.keys(champInfos)[lastNumber]].key}.png`
    document.getElementById("image-box").src = imageString;
};

button.onclick = function(){
    roll();
};

function roll(){
    setTimeout(function() {
        displayNumber();
        i++;
        if (i < 10) {
            roll();
        }
        else {
            i = 0;
            displayName(lastNumber);
        }
    }, rollDelay)
};


