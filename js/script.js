let xp = 0;
let health = 100;
let gold = 50;
let energia = 50
let currentWeapon = 0;
let fighting;
let saludTurista;
let inventory = ["Silbato"];
;

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector( "#button4" );
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const nombreDelTurista = document.querySelector("#nombreDelTurista");
const saludDelTurista = document.querySelector("#saludDelTurista");
const energiaEscrita = document.querySelector("#energia");
const imagenFondo = document.querySelector('#imagen');

const weapons = [
  { name: 'Silbato', power: 5 },
  { name: 'Codigo', power: 30 },
  { name: 'Ordenanza', power: 50 },
  { name: 'Torpedo', power: 100 }
];
const monsters = [
  {
    name: "Wimpa",
    level: 2,
    health: 15
  },
  {
    name: "Negrito",
    level: 8,
    health: 60
  },
  {
    name: "Borracho",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "Puesto Zhen",
    "button text": ["Ir al pueblo", "Bajar a la arena", "Sacar del agua"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Estás en el puesto Zhen, ves una rampa rota que te lleva al \"pueblo\"."
  },
  {
    name: "Pueblo",
  "button text": ["Compras medialunas de Alados, +10 de vida y +10 de cansancio (10 pesos)", "Costa dulce, puede salir bien o mal (+- vida y cansancio)","Local de elementos", "Volver a Puesto Zhen"],
    "button functions": [buyHealth, costaDulce, localStore ,goTown],
    text: "Llegaste a la 2 ¿Qué haces ahora?"
  },
  {
    name: "Bajar a la arena",
    "button text": ["Razonar con Wimpa parlantero", "Razonar con Negrito borracho", "Volver al Puesto Zhen"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Bajaste del puesto, ves varios turistas desagradables"
  },
  {
    name: "fight",
    "button text": ["Explicarle", "Evitarlo", "Irte para no matarlo"],
    "button functions": [attack, dodge, goTown],
    text: "Estás intentando hablar en un idioma desconocido, las eses no existen. <br> ¿Lograrás hacerlo entender antes de que te canse o te quite vida?"
  },
  {
    name: "El turista entendío",
    "button text": ["Volver a tu puesto", "Volver a tu puesto", "Volver a tu puesto"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'El turista dijo algunas palabras en un idioma desconocido, pero parece que te ha escuchado. Has ganado experiencia, pesos, y vida. '
  },
  {
    name: "No entendio",
    "button text": ["Volver a jugar", "Volver a jugar", "Volver a jugar"],
    "button functions": [restart, restart, restart],
    text: "El turista no entendió las señales claras, le metiste un torpedazo en la boca. Te echaron del operativo."
  },
  { 
    name: "Lo rescataste", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "¡Lo hiciste! pudiste sacar al borracho del agua. Te recibiste de Randall. Gustavo está orgulloso de vos " 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to Puesto Zhen?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Encontraste un juego secreto, elegí un numero y quizas Randal te ayude"
  },
  {
    name: "Compra venta de elementos",
    "button text": ["comprar", "vender","ver mochila" ,"irse"],
    "button functions": [buyWeapon, sellWeapon, verInventario ,goStore],
    text: "Acá podes comprar o vender los siguientes elementos: Silbato, Codigo, Ordenanza, Torpedo."
  },
  
];

function verInventario() {
  text.innerText= "Actualmente tenés: " + inventory 
  
}

// initialize buttons
button1.onclick = goStore ;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button4.innerText = location["button text"][3];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  button4.onclick = location["button functions"][3];
  text.innerHTML = location.text;

}

function goTown() {
  update(locations[0]);
  button4.style.display="none";
  cambiarImagen = imagenFondo.src = "images/playa.jpeg";

}


function goStore() {
  update(locations[1]);
  button4.style.display="block";
  cambiarImagen = imagenFondo.src = "images/pueblo.jpg";

}

function goCave() {
  update(locations[2]);
  cambiarImagen = imagenFondo.src = "images/arena.jpg";

}

function localStore() {
  update(locations[8]);
  cambiarImagen = imagenFondo.src = "images/elementos.jpg";
}


function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    energia+=10;
    energiaEscrita.innerText = energia;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "Te falta plata para comprar comida, pedile al Sugara un aumento y volvé.";
  }
  cambiarImagen = imagenFondo.src = "images/alados.jpg";

}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      // text.innerText = "Ahora tiene " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += "Agregado, ahora en la casilla tenes: " + inventory;
    } else {
      text.innerText = "Te falta plata para comprar el elemento, pedile al Sugara un aumento y volvé.";
    }
  } else {
    text.innerText = "Ya tenes todos los elementos posibles!";
    button2.innerText = "Vender elemento por 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Vos vendiste tu " + currentWeapon + ".";
    text.innerText += " En tu puesto tenes: " + inventory;
  } else {
    text.innerText = "¿Tenés un solo elemento y lo queres vender? no seas fisura";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
  cambiarImagen = imagenFondo.src = "images/parlante.jpg";
}

function fightBeast() {
  fighting = 1;
  goFight();
  cambiarImagen = imagenFondo.src = "images/borracho.jpg";

}

function fightDragon() {
  fighting = 2;
  goFight();
  cambiarImagen = imagenFondo.src = "images/conremera.jpg";
}

function goFight() {
  update(locations[3]);
  saludTurista = monsters[fighting].health;
  // monsterStats.style.display = "Te ignora";
  nombreDelTurista.innerText = monsters[fighting].name;
  saludDelTurista.innerText = saludTurista;
}

function attack() {
  text.innerText = "el " + monsters[fighting].name + " te bolupreguntea";
  text.innerText += " Vos tratas de hacerlo razonar con tu " + weapons[currentWeapon].name + ".";
  // health -= getMonsterAttackValue(monsters[fighting].level);
  monsterStats.style.display="block";
  aleatorio = Math.ceil(Math.random()*2);


  isMonsterHit()
  // if (isMonsterHit()) {
  //   saludTurista -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  // } else {
  //   text.innerText += " Fallaste.";
  // }
  healthText.innerText = health;
  saludDelTurista.innerText = saludTurista;
  if (health <= 0 || energia <=0) {
    lose();
  } else if (saludTurista <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Tu " + inventory.pop() + " se rompió.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 2) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  aleatorio = Math.ceil(Math.random()*2);
  switch (aleatorio) {
    case 1:      
        saludTurista -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
        text.innerText = "Acertaste, lo educaste un poco.";
        energia -= 1
        energiaEscrita.innerText = energia
        break;
    case 2:
          energia -= 1
          energiaEscrita.innerText = energia
          text.innerText = " Fallaste en tu intento. Te cansaste al pedo";
    break;
    
    default:break;}
}

function dodge() {

  if (health <= 0 || energia <=0) {
    lose();}
 
  else {  
  aleatorio = Math.ceil(Math.random()*2);
  monsterStats.style.display="block";
  console.log(aleatorio)
  switch (aleatorio) {
    case 1:      
        energia += 3
        energiaEscrita.innerText = energia
        health += 10
        healthText.innerText = health;
        text.innerText = "Esquivaste la bolupregunta, ganaste 3 de energía y 10 de esperanza de vida";
        break;
    case 2:
        energia -= 1
        energiaEscrita.innerText = energia
        text.innerText = " Fallaste en tu intento. Perdiste vida y Te cansaste";
        health -= getMonsterAttackValue(monsters[fighting].level)
        healthText.innerText = health;
      // const hit = (level * 5) - (Math.floor(Math.random() * xp));
    break;
    default:
    break;
  }

}
}
function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
  cambiarImagen = imagenFondo.src = "images/gusta.jpg";

}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["Silbato"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "Elegiste " + guess ;
  for (let i = 0; i < 10; i++) {
   
  }
  if (numbers.includes(guess)) {
    gold += 20;
    goldText.innerText = gold;
     text.innerText += " Ganaste 20 Pesos de propina por alejar al perro del Kite";
     
    }
     else {
    health -= 10;
    healthText.innerText = health;
    text.innerText += " El perro te mordió, perdiste 10 de energía";
    
        
    if (health <= 0) {
      lose();
  }
  }
 }
  
  
// funciones a agregar luego
   function costaDulce(){
    cambiarImagen = imagenFondo.src = "images/facturas.jpg";
  if (gold >= 20) {
    aleatorio = Math.ceil(Math.random()*3);
    switch (aleatorio) {
      case 1:      
             gold -= 20;
             health += 30;
             energia+= 30;
             healthText.innerText = health;
             goldText.innerText= gold;
             energiaEscrita.innerText= energia;
             text.innerText = "Tuviste suerte y estaba rico, ganaste 30 de vida y + 30 de descanso";
   
          break;
          
          case 2 :
             gold -= 20;
             health -= 10;
             energia -= 10;
             healthText.innerText = health;
             goldText.innerText= gold;
             energiaEscrita.innerText= energia;
             text.innerText = "Estaba rancio, te descompusiste, perdiste 10 de vida y tenes +10 de cansancio";
            break
          case 3:
            gold -= 20;
             health -= 10;
             energia -= 10;
             healthText.innerText = health;
             goldText.innerText= gold;
             energiaEscrita.innerText= energia;
             text.innerText = "Estuviste lanzando toda la tarde, perdiste energia y ganaste cansancio";
      break;
    }}

     else {
    text.innerText = "Te falta plata para comprar comida, pedile al Sugara un aumento y volvé.";
  }
   }
