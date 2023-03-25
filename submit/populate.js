/////////////////////POPULATE GAMES///////////////////////



/// start certain boxes hidden
var disp = "none";
var e4 = document.getElementsByClassName("e4info");
for (let i = 0; i < e4.length; i++) {
  e4[i].style.display = disp;
}

var badge = document.getElementsByClassName("badgeinfo");
for (let i = 0; i < badge.length; i++) {
  badge[i].style.display = disp;
}

let gamedropdown = document.getElementById('game-dropdown');
gamedropdown.length = 0;

let gamedefaultOption = document.createElement('option');
gamedefaultOption.text = '--Choose a Game--';

gamedropdown.add(gamedefaultOption);
gamedropdown.selectedIndex = 0;

const baseurl = 'https://raw.githubusercontent.com/brdy1/kaizorunstats/main/data/submit/';
let gamesfile = 'games.json';
const gamerequest = new XMLHttpRequest();
gamerequest.open('GET', baseurl.concat(gamesfile), true);

gamerequest.onload = function() {
  if (gamerequest.status === 200) {
    const gamedata = JSON.parse(gamerequest.responseText)['rows'];
    let option;
    for (let i = 0; i < gamedata.length; i++) {
      option = document.createElement('option');
      option.text = gamedata[i].gamegroupname;
      option.value = gamedata[i].gamegroupid;
      gamedropdown.add(option);
    }
   } else {
    // Reached the server, but it returned an error
  }   
}


gamerequest.onerror = function() {
  console.error('An error occurred fetching the JSON from ' + baseurl.concat(gamesfile));
};

gamerequest.send();

/////////////// POPULATE NATURES //////////////////

let naturedropdown = document.getElementById('nature-dropdown');
naturedropdown.length = 0;

let naturedefaultOption = document.createElement('option');
naturedefaultOption.text = '--Choose a Nature--';

naturedropdown.add(naturedefaultOption);
naturedropdown.selectedIndex = 0;

let naturefile = 'natures.json';
const naturerequest = new XMLHttpRequest();
naturerequest.open('GET', baseurl.concat(naturefile), true);

naturerequest.onload = function() {
  if (naturerequest.status === 200) {
    const naturedata = JSON.parse(naturerequest.responseText)['rows'];
    let option;
    for (let i = 0; i < naturedata.length; i++) {
      option = document.createElement('option');
      naturename = naturedata[i].naturename;
      if (naturedata[i].raisedstat) {
        raisedname = naturedata[i].raisedstat;
        loweredname = naturedata[i].loweredstat;
        option.text = naturename+' (+'+raisedname+'/-'+loweredname+')'
      } else {
        option.text = naturename;
      }
      option.value = naturedata[i].natureid;
      naturedropdown.add(option);
    }
   } else {
    // Reached the server, but it returned an error
  }   
}


naturerequest.onerror = function() {
  console.error('An error occurred fetching the JSON from ' + baseurl.concat(naturefile));
};

naturerequest.send();


//////////////////////////////////////////////////////////////////////////////////////
//////////////// ONCLICK POPULATE THE REST AND SHOW OR HIDE NATURES://///////////////

document.getElementById("game-dropdown").onchange = function() {
    const gamedata = JSON.parse(gamerequest.responseText)['rows'];
    var gamegroupid=document.getElementById("game-dropdown").value;
    for (let i = 0; i < gamedata.length; i++) {
        gamegroupcheck = gamedata[i].gamegroupid;
        if (gamegroupcheck == gamegroupid) {
            var thisgeneration=gamedata[i].generationid;
            var thisgamegroup=gamedata[i].gamegroupname;
        } else {
            // Move to next
        }
    }
    console.log(thisgeneration);
    document.getElementById("pokemoninfo").style.display = "block";
    populatePokemon(thisgeneration);
    populateAbilities(thisgeneration);
    populateMoves(thisgeneration);
    setGenerationVariables(thisgamegroup,thisgeneration);
    if (thisgeneration > 1) {
        document.getElementById("nature-dropdown").style.display = "block";
        document.getElementById("ability-dropdown").style.display = "block";
    } else {
        document.getElementById("nature-dropdown").style.display = "none";
        document.getElementById("ability-dropdown").style.display = "none";
    }
 };


////////////////////////POPULATE POKEMON/////////////////////////

function populatePokemon(thisgeneration) {
    let pokemondropdown = document.getElementById('pokemon-dropdown');
    pokemondropdown.length = 0;

    let pokemondefaultOption = document.createElement('option');
    pokemondefaultOption.text = '--Choose a Pokemon--';
    pokemondefaultOption.value = -1;

    pokemondropdown.add(pokemondefaultOption);
    pokemondropdown.selectedIndex = 0;

    let pokemonfile = 'pokemon.json';
    const pokemonrequest = new XMLHttpRequest();
    pokemonrequest.open('GET', baseurl.concat(pokemonfile), true);

    pokemonrequest.onload = function() {
    if (pokemonrequest.status === 200) {
        const pokemondata = JSON.parse(pokemonrequest.responseText)['rows'];
        let option;
        for (let i = 0; i < pokemondata.length; i++) {
          option = document.createElement('option');
          option.text = pokemondata[i].pokemonname;
          option.value = pokemondata[i].pokemonpokedexnumber;
          if (pokemondata[i].generationid == thisgeneration) {
              pokemondropdown.add(option);
          }
          else {
              // Pokemon not in this generation.
          }
        }
    } else {
        // Reached the server, but it returned an error
    }   
    }

    pokemonrequest.onerror = function() {
    console.error('An error occurred fetching the JSON from ' + baseurl.concat(pokemonfile));
    };

    pokemonrequest.send();
}
////////////////////////POPULATE ABILITIES/////////////////////////

function populateAbilities(thisgeneration) {
    let abilitydropdown = document.getElementById('ability-dropdown');
    abilitydropdown.length = 0;

    let abilitydefaultOption = document.createElement('option');
    abilitydefaultOption.text = '--Choose an Ability--';
    abilitydefaultOption.value = -1;

    abilitydropdown.add(abilitydefaultOption);
    abilitydropdown.selectedIndex = 0;

    let abilityfile = 'abilities.json';
    const abilityrequest = new XMLHttpRequest();
    abilityrequest.open('GET', baseurl.concat(abilityfile), true);

    abilityrequest.onload = function() {
    if (abilityrequest.status === 200) {
        const abilitydata = JSON.parse(abilityrequest.responseText)['rows'].sort((a,b) => {
          let fa = a.abilityname.toLowerCase(),fb=b.abilityname.toLowerCase();
          if (fa < fb) {return -1;}
          if (fa > fb) {return 1;}
          return 0;});
        let option;
        var index = 0;
        for (let i = 0; i < abilitydata.length; i++) {
          if (abilitydata[i].generationid <= thisgeneration) {
              option = document.createElement('option');
              option.text = abilitydata[i].abilityname;
              option.value = abilitydata[i].abilityid;
              option.selectedIndex = index;
              index=index+1;
              abilitydropdown.add(option);
        } else {
            // Ability is not in this generation
        }
        }
    } else {
        // Reached the server, but it returned an error
    }   
    }

    abilityrequest.onerror = function() {
      console.error('An error occurred fetching the JSON from ' + baseurl.concat(abilityfile));
    };

    abilityrequest.send();
}
////////////////////////POPULATE MOVES///////////////////////

function populateMoves(thisgeneration) {
    let movedropdown1 = document.getElementById('move-dropdown1');
    let movedropdown2 = document.getElementById('move-dropdown2');
    let movedropdown3 = document.getElementById('move-dropdown3');
    let movedropdown4 = document.getElementById('move-dropdown4');
    movedropdown1.length = 0;
    movedropdown2.length = 0;
    movedropdown3.length = 0;
    movedropdown4.length = 0;
    
    let movedefaultOption1 = document.createElement('option');
    movedefaultOption1.text = '--Choose Move 1--';
    
    let movedefaultOption2 = document.createElement('option');
    movedefaultOption2.text = '--Choose Move 2--';
    
    let movedefaultOption3 = document.createElement('option');
    movedefaultOption3.text = '--Choose Move 3--';
    
    let movedefaultOption4 = document.createElement('option');
    movedefaultOption4.text = '--Choose Move 4--';
    
    movedropdown1.add(movedefaultOption1);
    movedropdown1.selectedIndex = 0;
    movedropdown2.add(movedefaultOption2);
    movedropdown2.selectedIndex = 0;
    movedropdown3.add(movedefaultOption3);
    movedropdown3.selectedIndex = 0;
    movedropdown4.add(movedefaultOption4);
    movedropdown4.selectedIndex = 0;

    let movefile = 'moves.json';
    const moverequest = new XMLHttpRequest();
    moverequest.open('GET', baseurl.concat(movefile), true);
    
    moverequest.onload = function() {
      if (moverequest.status === 200) {
        const data = JSON.parse(moverequest.responseText)['rows'];
        let option1;
        let option2;
        let option3;
        let option4;
        for (let i = 0; i < data.length; i++) {

          option1 = document.createElement('option');
          option1.generation = data[i].generationid;
          option1.text = data[i].movename;
          option1.value = data[i].moveid;

          option2 = document.createElement('option');
          option2.generation = data[i].generationid;
          option2.text = data[i].movename;
          option2.value = data[i].moveid;
          
          option3 = document.createElement('option');
          option3.generation = data[i].generationid;
          option3.text = data[i].movename;
          option3.value = data[i].moveid;
          
          option4 = document.createElement('option');
          option4.generation = data[i].generationid;
          option4.text = data[i].movename;
          option4.value = data[i].moveid;

          if (option1.generation == thisgeneration) {
            movedropdown1.add(option1);
            movedropdown2.add(option2);
            movedropdown3.add(option3);
            movedropdown4.add(option4);
          } else {
    
          }
        }
       } else {
        // Reached the server, but it returned an error //
      }   
    }
    
    moverequest.onerror = function() {
      console.error('An error occurred fetching the JSON from ' + baseurl.concat(movefile));
    };
    
    moverequest.send();
    }


function setGenerationVariables(gameGroup,generation){
  badgecount = document.getElementById('badgecount-number')
  if (generation === 7){
    badgecount.min = 0;
    badgecount.max = 4;
    firstleader = document.getElementById('gymleader')
    firstleader.textContent = "Did the run reach Hala?"
    howmany = document.getElementById('badgelabel')
    howmany.textContent = "How many kahunas/island challenges did the run complete?"
  }
  else if (gameGroup === "HeartGold/SoulSilver"){
    badgecount.min = 0;
    badgecount.max = 16;
    firstleader = document.getElementById('gymleader')
    firstleader.textContent = "Did the run reach Falkner's gym?"
  }
  else if (gameGroup === "Red/Blue"){
    badgecount.min = 0;
    badgecount.max = 8;
    firstleader = document.getElementById('gymleader')
    firstleader.textContent = "Did the run reach Brock's gym?"
  }
  else if (gameGroup === "Yellow"){
    badgecount.min = 0;
    badgecount.max = 8;
    firstleader = document.getElementById('gymleader')
    firstleader.textContent = "Did the run reach Brock's gym?"
  }
  else if (gameGroup === "Gold/Silver"){
    badgecount.min = 0;
    badgecount.max = 16;
    firstleader = document.getElementById('gymleader')
    firstleader.textContent = "Did the run reach Falkner's gym?"
  }
  else if (gameGroup === "Crystal"){
    badgecount.min = 0;
    badgecount.max = 16;
    firstleader = document.getElementById('gymleader')
    firstleader.textContent = "Did the run reach Falkner's gym?"
  }
  else if (gameGroup === "FireRed/LeafGreen"){
    badgecount.min = 0;
    badgecount.max = 8;
    firstleader = document.getElementById('gymleader')
    firstleader.textContent = "Did the run reach Brock's gym?"
  }
  else if (gameGroup === "Ruby/Sapphire"){
    badgecount.min = 0;
    badgecount.max = 8;
    firstleader = document.getElementById('gymleader')
    firstleader.textContent = "Did the run reach Roxanne's gym?"
  }
  else if (gameGroup === "Emerald"){
    badgecount.min = 0;
    badgecount.max = 8;
    firstleader = document.getElementById('gymleader')
    firstleader.textContent = "Did the run reach Roxanne's gym?"
  }
  else if (gameGroup === "Diamond/Pearl"){
    badgecount.min = 0;
    badgecount.max = 8;
    firstleader = document.getElementById('gymleader')
    firstleader.textContent = "Did the run reach Roark's gym?"
  }
  else if (gameGroup === "Platinum"){
    badgecount.min = 0;
    badgecount.max = 8;
    firstleader = document.getElementById('gymleader')
    firstleader.textContent = "Did the run reach Roark's gym?"
  }
  else if (gameGroup === "Black/White"){
    badgecount.min = 0;
    badgecount.max = 8;
    firstleader = document.getElementById('gymleader')
    firstleader.textContent = "Did the run reach the first gym?"
  }
  else if (gameGroup === "Black2/White2"){
    badgecount.min = 0;
    badgecount.max = 8;
    firstleader = document.getElementById('gymleader')
    firstleader.textContent = "Did the run reach Cheren's gym?"
  }
  else if (gameGroup === "X/Y"){
    badgecount.min = 0;
    badgecount.max = 8;
    firstleader = document.getElementById('gymleader')
    firstleader.textContent = "Did the run reach Viola's gym?"
  }
  else if (gameGroup === "OmegaRuby/AlphaSapphire"){
    badgecount.min = 0;
    badgecount.max = 8;
    firstleader = document.getElementById('gymleader')
    firstleader.textContent = "Did the run reach Roxanne's gym?"
  }
}

//////////////////// Show/hide E4 info panel ///////////////////

document.getElementById("e4-yes").onchange = function() {
  var e4 = document.getElementById("e4info");
  var e4yesno = document.getElementById("e4-yes").value;
  if (e4yesno == "true") {
      e4.style.display = "block";
}
}

document.getElementById("e4-no").onchange = function() {
var e4 = document.getElementById("e4info");
var e4yesno = document.getElementById("e4-no").value;
if (e4yesno == "false") {
    e4.style.display = "none";
}
}
///////////////// Show/hide Badge info panel ///////////////////

document.getElementById("firstgym-yes").onchange = function() {
  var badge = document.getElementById("badgeinfo");
  var badgeyesno = document.getElementById("firstgym-yes").value;
  if (badgeyesno == "true") {
    badge.style.display = "block";
}
}

document.getElementById("firstgym-no").onchange = function() {
var badge = document.getElementById("badgeinfo");
var badgeyesno = document.getElementById("firstgym-no").value;
if (badgeyesno == "false") {
  badge.style.display = "none";
}
}
////////////